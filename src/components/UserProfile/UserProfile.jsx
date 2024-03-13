import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import s from './UserProfile.module.css';

const UserProfile = ({userData}) => {
  // Use useSelector to retrieve userData from the Redux store
 
    console.log("UserData",userData)
  return (
    <div className='w-full'>
      {userData ? (
        <div className='flex flex-row justify-center items-center w-full'>
       <motion.div
       className='w-full'
       style={{
        maxWidth: "85%",
       }}
       initial={{
        opacity: 0,
        x: 0,
        scale: 1,
        y: -10,
        transition: { duration: 0.23, delay: 0.36 },
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: 0.23, delay: 0.36 },
      }}
      exit={{
        opacity: 0,
        scale: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.23 },
      }}
       >
       <div className='flex flex-col items-center justify-center w-full gap-4'>
          <h1 className='text-2xl uppercase text-slate-400'>Mon profil</h1>
          {/* Display user information here */}
          <div className='w-full' style={{
            display: 'flex',
            flexDirection: 'row',
            gap: "0.5rem",
            alignItems: 'center',

            justifyContent: 'space-between',
            padding: '0.4rem',
            paddingLeft: '1.1rem',
            paddingRight : '1.1rem',
            borderRadius: '0.4rem',
            backgroundColor: 'white',
            border: '1px solid #5E24FF32',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.1)',
          
          }}>
         
            <div className='flex flex-row gap-4 items-center justify-start'>

            <img
              src={`https://api.dicebear.com/7.x/personas/svg?seed=${userData.username}`}
              alt="User profile"
              className="rounded-full"
              width={47}
              
              style={{
                backgroundColor: '#5d24ff12',
                border: '2px solid #5E24FF4A',
              
              }}
            />

            <p className='text-slate-600'> {userData.username}</p>

            </div>
            
            <ModeEditIcon className={`${s.button_float}`} style={{color: 'rgb(94 36 255 / 52%)'}}/>
           
          </div>
          
          {/* Add more user data fields as needed */}
        </div>
        </motion.div>
       
        </div>
      ) : (
        <p>User is not authenticated.</p>
      )}
    </div>
  );
};

export default UserProfile;
