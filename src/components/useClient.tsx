import React, { useState, useEffect, ComponentType } from 'react'

export const useClient = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  return (props: P) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])

    if (!isClient) {
      return null;
    }
    

    return <WrappedComponent {...props} />
  }
}
