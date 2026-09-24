import React, { useEffect, useState } from 'react'
import {useLocation, Routes,Route} from 'react-router-dom'
import axios from 'axios'
import Home from './pages/public/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Features from './pages/public/Features'
import Navbar from './components/Navbar'
import Pricing from './pages/public/Pricing'
import Templates from './pages/public/Templates'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Dashboard from './pages/app/Dashboard'
import Classic from './templates/resumes/Classic'
import Minimal from './templates/resumes/Minimal'
import Resumetemplates from './pages/app/ResumeBuilder/Resumetemplates'
import Resumeedit from './pages/app/ResumeBuilder/Resumeedit'
import user_context  from './UseContext'
import Text from './pages/app/ResumeBuilder/Text'
import Portfoliotemplates from './pages/app/portfolioBuilder/Portfoliotemplates'
import Preview from './pages/app/portfolioBuilder/Preview'
import Darktheme from './templates/portfolio/Darktheme'
import Portfolioedit from './pages/app/portfolioBuilder/Portfolioedit'
import Portfolioshower from './pages/app/portfolioBuilder/Portfolioshower'
import Userportfolios from './pages/app/portfolioBuilder/Userportfolios'
import PortfolioDetails from './pages/app/portfolioBuilder/PortfolioDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Protect from './components/Protect'
import Images from './pages/app/portfolioBuilder/Images'
import Profile from './pages/auth/Profile'
import Portfoliorenderer from './pages/app/portfolioBuilder/Portfoliorenderer'
import Portfolioupdate from './pages/app/portfolioBuilder/Portfolioupdate'
import Uploadresume from './pages/app/ats analyzer/Uploadresume'
import Analysis from './pages/app/ats analyzer/Analysis'
import KeywordOptimization from './pages/app/ats analyzer/KeywordOptimization'
import Success from './pages/auth/Success'

const App = () => {



  const [email,setemail]=useState('')

 const [formdata, setformdata] = useState({
  personalInfo: {
    fullName: 'Johnathan Doe',
    title: 'Senior Full Stack Developer',
    summary: 'Innovative and detail-oriented developer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture, with a proven track record of improving site performance by 40%.'
  },
  links: {
    email: { active: true, url: 'john.doe@example.com' },
    mobile: { active: true, url: '+1 (555) 000-1234' },
    address: { active: true, url: 'San Francisco, CA' },
    github: { active: true, url: 'github.com/johndoe' },
    linkedin: { active: true, url: 'linkedin.com/in/johndoe' },
    website: { active: true, url: 'johndoe.dev' },
    instagram: { active: false, url: '' },
  },
  education: [
    { 
      school: 'Stanford University', 
      degree: 'B.S. in Computer Science', 
      startDate: '2014', 
      endDate: '2018', 
      description: 'Graduated with Honors. Specialized in AI and Distributed Systems.' 
    }
  ],
  experiences: [
    { 
      company: 'Tech Solutions Inc.', 
      role: 'Senior Developer', 
      startDate: 'Jan 2021', 
      endDate: 'Present', 
      desc: 'Led a team of 5 developers to rebuild the core e-commerce platform using React and GraphQL.' 
    },
    { 
      company: 'StartUp Hub', 
      role: 'Junior Web Developer', 
      startDate: 'June 2018', 
      endDate: 'Dec 2020', 
      desc: 'Implemented responsive UI components and integrated RESTful APIs.' 
    }
  ],
  projects: [
    { 
      title: 'AI Portfolio Builder', 
      link: 'https://github.com/johndoe/ai-builder', 
      desc: 'An automated tool that uses LLMs to generate professional portfolios from LinkedIn profiles.' 
    }
  ],
  certificates: 'AWS Certified Solutions Architect, Google Professional Cloud Developer',
  skills: [
    { category: 'Frontend', list: 'React, Next.js, TypeScript, Tailwind CSS' },
    { category: 'Backend', list: 'Node.js, Express, MongoDB, PostgreSQL' },
    { category: 'Tools', list: 'Docker, AWS, Git, Jenkins' }
  ],
  fontSize: 16,
  lineHeight: 1.5,
  visibleSections: {
    summary: true,
    education: true,
    experience: true,
    projects: true,
    certificates: true,
    skills: true
  }
});

const [portdata, setportdata] = useState({
    navbar: { 
        logo: '<john doe.dev />' 
    },
    hero: {
        name: 'John Doe',
        headline: 'Full Stack MERN Developer',
        subheadline: 'Specializing in building high-performance web applications and AI-driven SaaS solutions.',
        status: 'Available for Freelance',
    },
    bgImages: [
        { url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c' }
    ],
    about: {
        description: 'I am a final-year B.Tech student and a passionate MERN stack developer. I focus on creating seamless user experiences with clean code, SEO best practices, and modern UI/UX principles.',
        
    },
    stats: [
        { label: 'Year', value: 'Final' },
        { label: 'Projects', value: '10+' },
        { label: 'Experience', value: 'MERN Stack' }
    ],
    techStack: [
        { name: 'MongoDB', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'React.js', level: 95 },
        { name: 'Node.js', level: 88 },
        { name: 'Figma', level: 80 }
    ],
    journey: [
        { 
            duration: '2022 - 2026', 
            title: 'B.Tech Computer Science', 
            institution: 'University' 
        },
        { 
            duration: '2025 - 2026', 
            title: 'Full Stack Training', 
            institution: 'Development Institute' 
        }
    ],
    projects: [
        { 
            title: 'AI Resume ATS Analyzer', 
            tech: 'MERN & Gemini API', 
            desc: 'A professional SaaS platform that helps users optimize their resumes for ATS systems using AI.', 
            image: 'https://images.unsplash.com/photo-1763970586854-fe90924fd4fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
            liveLink: '#', 
            sourceCode: '#' 
        },
        { 
            title: 'BinaryBravos Tech Blog', 
            tech: 'React & Node.js', 
            desc: 'An SEO-friendly blog platform designed for tech enthusiasts to share knowledge and insights.', 
            image: 'https://images.unsplash.com/photo-1764549906172-0153db0825bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8', 
            liveLink: '#', 
            sourceCode: '#' 
        }
    ],
    contact: [
        { platform: 'Email', value: 'hello@example.com' },
        { platform: 'Location', value: 'Punjab, India' },
        { platform: 'LinkedIn', value: 'linkedin.com/in/johndoe' },
        { platform: 'GitHub', value: 'github.com/johndoe' }
    ]
});

const [portslug , setportslug] = useState()

const location = useLocation();

  // 1. Define the pages where you DON'T want the Navbar
  const noNavbarPaths = ['/login', '/signup'];

  const [login,setlogin]=useState(true)
  const [islogin, notlogin] = useState(false);

  const showNavbarRoutes = [
  '/',
  '/features',
  '/pricing',
  '/templates',
  '/about',
  '/contact',
  '/dashboard',
  '/success',
  '/Resumetemplates',
  '/Resumeedit',
  '/portfoliotemplate',
  '/preview',
  '/portfolioedit',
  '/portfolioshower',
  '/portfolioupdate',
  '/userportfolios',
  '/uploadresume',
  '/analysis',
  '/keyword',
  '/profile',
  '/image'
];
  
  return (
  <>
<user_context.Provider value={{formdata,setformdata,login,setlogin,portdata,setportdata, islogin, notlogin, email,setemail,portslug , setportslug}}>



{/* {showNavbarRoutes.includes(location.pathname) && <Navbar />}   */}
{ (showNavbarRoutes.includes(location.pathname) || location.pathname.startsWith('/portfoliodetails/')) && <Navbar /> }
 {/* {login?<Navbar/>:null}
   
   */}
    <Routes>
      <Route path='/test' element={<Text/>}/>

    {/* auth routes */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
 
    {/* public routes */}
     <Route path='/' element={ <Protect> <Home/> </Protect> }/>
      <Route path='/features' element={<Protect> <Features/> </Protect>}/>
      <Route path='/pricing' element={<Protect> <Pricing/> </Protect>}/>
      <Route path='/templates' element={<Protect> <Templates/></Protect>}/>
      <Route path='/about' element={<Protect> <About/> </Protect>}/>
      <Route path='/contact' element={<Protect> <Contact/> </Protect>}/>
     

    {/* app routes   */}

    <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
    <Route path='/Resumetemplates' element={<ProtectedRoute> <Resumetemplates/> </ProtectedRoute> }/>
    <Route path='/Resumeedit' element={<ProtectedRoute> <Resumeedit/> </ProtectedRoute> }/>



    <Route path='/success' element={ <Success/>  }/>


    <Route path='/portfoliotemplate' element={<ProtectedRoute> <Portfoliotemplates/> </ProtectedRoute> }/>
    <Route path='/preview' element={<ProtectedRoute> <Preview/> </ProtectedRoute>}/>
    <Route path='/portfolioedit' element={<ProtectedRoute> <Portfolioedit/> </ProtectedRoute>}/>
    <Route path='/portfolioshower' element={ <ProtectedRoute> <Portfolioshower/> </ProtectedRoute> }/>
    <Route path='/userportfolios' element={<ProtectedRoute> <Userportfolios/> </ProtectedRoute> }/>
    <Route path='/portfolioupdate' element={<ProtectedRoute> <Portfolioupdate/> </ProtectedRoute> }/>

    {/* <Route path='/portfoliodetails' element={<ProtectedRoute> <PortfolioDetails/> </ProtectedRoute> }/> */}
      <Route path='/portfoliodetails/:slug' element={<ProtectedRoute> <PortfolioDetails/> </ProtectedRoute> }/>

      <Route path='/:slug' element={<Portfoliorenderer/>  }/>
      


      <Route path='/uploadresume' element={ <ProtectedRoute> <Uploadresume/></ProtectedRoute>}/>
      <Route path='/analysis' element={ <ProtectedRoute> <Analysis/></ProtectedRoute>}/>
      <Route path='/keyword' element={ <ProtectedRoute> <KeywordOptimization/></ProtectedRoute>}/>

    <Route path='/image' element={<Images/>}/>


    {/* resume templates */}
    {/* <Route path='/classic' element={<Classic/>}/>
    <Route path='/minimal' element={<Minimal/>}/> */}


    {/* portfolio template */}
    {/* <Route path='/darktheme' element={<Darktheme/>}/> */}





    

 
    </Routes>
    </user_context.Provider>
  </>
    
  )
}

export default App