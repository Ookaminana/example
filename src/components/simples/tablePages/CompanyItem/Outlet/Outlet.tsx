import React, { FC } from 'react'
import { OutletType } from '../../../../../types'
import { Col } from '../../../modalEditor/Col'
import { Row } from '../../../modalEditor/Row'
import styles from './Outlet.module.scss'

type Props = {
    // headers: Array<string>
    // rows: Array<{
    //     id: number
    //     values: Array<string>
    // }>
    // loading?: boolean
    // onEdit?: (id: number) => void
    // onDelete?: (id: number) => void
    outlets: Array<OutletType>
}

const Outlet: FC<Props> = ({
    outlets,
    // headers,
    // rows,
    // loading = false,
    // onEdit,
    // onDelete,
}) => {
    return (
        // {outlets && outlets.map((outlets) => {
        <Row css={styles.outletWrapper}>
            {outlets.map((outlet) => (
                // <Col css={styles.borderOutlet} width={'half'}>
                <div className={styles.borderOutlet}>
                    <div className={styles.wrapper}>
                        <div className={styles.outletName}>{outlet.name}</div>
                        {outlet.automats.map((automat) => (
                            <div className={styles.mashineName}>
                                {automat.name}
                            </div>
                        ))}
                    </div>
                </div>
                // </Col>
            ))}
        </Row>
        // })
    )
}

export default Outlet
