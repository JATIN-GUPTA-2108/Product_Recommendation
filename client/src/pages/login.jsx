// import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {Routes, Route, useNavigate} from 'react-router-dom';

const supabase = createClient('https://tifwperjqwphlvqqfpgo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZndwZXJqcXdwaGx2cXFmcGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3NDc4NTQsImV4cCI6MjAwMDMyMzg1NH0.jRFIDAR1GNj-kS3fmXX8tR4F1mu_IUbWMC49Hpfh35A')

export default function App() {
  const [session, setSession] = useState(null)
  const [login, setLogin] = useState(false)
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session) 
    })
    // console.log(session.user.email)
    return () => subscription.unsubscribe()
  }, [])
  
  const navigate = useNavigate();
  if (!session) {
    return (
      <>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={["google"]} />
        {console.log(session)}
      </>
   
      )
    }
    else {
      
      return (<div>Logged in!
        {/* {console.log(session)} */}
        {/* {navigate('/shop')}\ */}
        {location.replace('/shop')}
        {/* {localStorage.setItem("Uid",session. )} */}
    </div>)
  }
}