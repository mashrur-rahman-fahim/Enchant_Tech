import React, { useState } from 'react'


export const Cart = () => {
  
  
  
  return (
    
    <div>
        {
          cartData.map((item)=>{
         return(
          <>
          <button >add</button>
          {item.name}
          </>
         )


          })

        }
    </div>
  )
}
