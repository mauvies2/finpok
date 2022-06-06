import { useState } from 'react'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useAuthDispatch } from 'finpoq/store/auth/AuthProvider'

export const useAuthWithGoogle = () => {
  const [couldAuth, setCouldAuth] = useState<null | boolean>(null)
  const { googleLogin } = useAuthDispatch()

  const handleGoogleAuth = async (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in googleData) {
      await googleLogin({
        _id: googleData.googleId,
        name: googleData.profileObj.name,
        email: googleData.profileObj.email,
        imageUrl: googleData.profileObj.imageUrl,
        token: googleData.tokenId,
      })
    }
  }

  const handleGoogleFailure = () => {
    setCouldAuth(false)
  }

  return { handleGoogleAuth, handleGoogleFailure, couldAuth }
}
