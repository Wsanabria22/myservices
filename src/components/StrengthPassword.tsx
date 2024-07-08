import React from 'react'

interface StrengthPasswordProps {
  checkPass: number;
}

const StrengthPassword = ({checkPass}:StrengthPasswordProps) => {
  return (
    <>
      { checkPass < 5 ?
        <>
         <div>
          <span className='font-semibold text-sm '>El password debe contener:</span>
         </div>
         <ul className='text-sm'>
            <li>Al menos 1 letra mayuscula</li>
            <li>Al menos 1 letra minuscula</li>
            <li>Al menos 1 numero</li>
            <li>Al menos 1 caracter especial</li>
            <li>Al menos 8 caracteres de longitud</li>
          </ul> 
        </> : null
      }
            <div style={{textAlign: 'center', color: checkPass < 5 ? 'red' : 'blue'}}>
        { checkPass >= 5 ? "Strong" :
          checkPass >= 2 ? "Medium" : "Weak"
        }  Password
      </div>
    </>
  )
}

export default StrengthPassword