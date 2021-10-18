import React, {FC} from "react";
import styles from './Error404.module.scss'
import {Layout} from "../../complexes/Layout";

type Props = {}

const Error404: FC<Props> = () => {

  return (
    <Layout>
      <div className={styles.error404}>404</div>
    </Layout>
  )
}

export default Error404