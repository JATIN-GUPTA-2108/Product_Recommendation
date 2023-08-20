import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


def recommendationSystem(user):
    # Formatting data to suit other functions
    def data_formatting(product_df):
        product_df = product_df.sort_values(
            'time').groupby(['userid', 'productid'])['event'].apply(list)

        # Finding the max event the user has done for a parituclar id
        for key, value in product_df.items():
            maxi = max(value)
            idx = -1

            for i in range(len(value)):
                if value[i] == event_dict['Like'] or value[i] == event_dict['Dislike']:
                    idx = i

            if idx != -1 and (maxi == event_dict['Like'] or maxi == event_dict['Dislike']):
                product_df[key] = value[idx]
            else:
                product_df[key] = maxi

        product_df = product_df.reset_index()

        return product_df

    # New User recommendations
    def cold_start(products):
        product_rating = dict()

        # Calculating Ratings
        for productid, product in products.items():
            rating = 0.5 * product['views'] + 2 * (product['likes'] - product['dislikes']) + 4 * \
                product['purchases'] + 2 * product['addToCart'] + \
                3 * (product['normalRating'] >= 4.20)

            product_rating[productid] = rating

        # Sorting products on the basis of ratings calculated
        sorted_product_rating = sorted(
            product_rating.items(), key=lambda x: x[1], reverse=True)
        recommended_products = list(int(i)
                                    for i in dict(sorted_product_rating).keys())

        return set(recommended_products[:50])

    # User - User Similarity Recommendation System
    def collaborative_filtering(user_df, items_checked_by_user, user):
        # Building User Product Matrix and remove Nan Values from it
        user_product_matrix = user_df.pivot_table(
            index='userid', columns='productid', values='event').applymap(
            lambda x: x if x > 0 else 0)

        # Building user-user matrix
        user_user_sim_matrix = pd.DataFrame(
            cosine_similarity(user_product_matrix))

        # Reassingning indexes to make data more readable
        user_user_sim_matrix.columns = user_product_matrix.index
        user_user_sim_matrix['userid'] = user_product_matrix.index
        user_user_sim_matrix = user_user_sim_matrix.set_index('userid')

        # Fetching Users similar to 'user'
        similar_users = user_user_sim_matrix.loc[user].sort_values(
            ascending=False)

        similar_users_id = list(similar_users.head(4).index)

        recommendation_set = set()

        # Fetches products with similar users
        for userid in similar_users_id:
            items_checked_by_sim_user = set(
                user_product_matrix.loc[userid].iloc[user_product_matrix.loc[userid].to_numpy().nonzero()].index)
            recommendation_set.update(items_checked_by_sim_user)

        return (recommendation_set - items_checked_by_user)

    # User Preference Recommendation System
    def content_filtering(user_df, product_df, items_checked_by_user,  user):

        # Transposing Matrix and setting index as productid
        product_df = product_df.T
        product_df.index.name = 'productid'

        # Fetches events done by the user 'user'
        user_product_table = user_df.loc[user_df['userid'] == user].set_index(
            'productid').drop('userid', axis=1)

        # Creates a binary matrix of all the categories that the product contains
        product_category_matrix = pd.get_dummies(product_df.explode('categories')['categories']).groupby(
            'productid').sum()

        # Creates a matrix on the basis of events of all the categories the user has interacted with
        weighted_user_product_category_matrix = product_category_matrix.mul(
            user_product_table['event'], axis=0).applymap(lambda x: x if x > 0 else 0)

        # Adding userid column with same id as 'user' in the matrix to set the index of matrix to userid
        weighted_user_product_category_matrix['userid'] = user
        weighted_user_category_matrix = weighted_user_product_category_matrix.set_index(
            'userid')

        # Creating weighted category matrix between user and categories
        user_weighted_category_matrix = weighted_user_category_matrix.groupby(
            'userid').sum()

        # Finding sum of weights of all categories to normalize the categories
        total_category_weight = user_weighted_category_matrix.sum(axis=1)[user]

        # Normalizing all the categories
        normalized_category_matrix = user_weighted_category_matrix.div(
            total_category_weight)

        # Converting normalized values to a list
        normalized_weight_list = list(normalized_category_matrix.iloc[0])

        # Creating prefering matrix for all products to recommend
        weighted_preference_category_matrix = product_category_matrix.iloc[:,
                                                                           0:] * normalized_weight_list
        weighted_preference_category_matrix['preference'] = weighted_preference_category_matrix.sum(
            axis=1)
        weighted_preference_category_matrix = weighted_preference_category_matrix.sort_values(
            'preference', ascending=False)

        recommendation_set = set(
            weighted_preference_category_matrix.head(50).index)

        return (recommendation_set - items_checked_by_user)

    # Event Meaning and their corresponding value
    event_dict = {'View': 1, 'Dislike': -2,
                  'Like': 2, 'Add_to_cart': 3, 'Purchase': 4}

    # Formatting and cleaning the user logs
    user_log_df = data_formatting(pd.read_json('../logs.json'))

    # Reading Product Data
    product_df = pd.read_json('../allProducts.json')

    # Recommended products based on popularity
    cold_start_recommendation_set = cold_start(product_df)

    user_user_recommendation_set = set()
    content_recommendation_set = set()

    # Checking if user is present in the user logs or not
    if user in user_log_df['userid'].unique():
        # Items checked by user
        items_checked_by_user = set(user_log_df.loc[user_log_df['userid'] == user].set_index(
            'productid').drop('userid', axis=1).index)
        
        cold_start_recommendation_set -= items_checked_by_user
        
        # Recommended products based on user-user similarity
        user_user_recommendation_set = collaborative_filtering(
            user_log_df, items_checked_by_user, user)
        # Recommended products based on user preferences
        content_recommendation_set = content_filtering(
            user_log_df, product_df, items_checked_by_user, user)
    else:
        print('New User Detected')

    print('Recommendations generated for user!')

    return list(cold_start_recommendation_set | user_user_recommendation_set | content_recommendation_set)[:100]

