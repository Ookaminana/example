import React, { FC } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Layout } from '../../complexes/Layout'

type Props = RouteComponentProps & {}

const Home: FC<Props> = () => {
    return <Layout />
}

export default withRouter(Home)
