import React from 'react'

import { Alert as AlertBase, Text} from 'native-base'


export const Alert = ({ status, message }: { status: string, message: string}) => {
    return (
        <AlertBase
            status={status}
            w='100%'
            p={2}
        > 
            <Text>{message}</Text>
        </AlertBase>
    )
}
