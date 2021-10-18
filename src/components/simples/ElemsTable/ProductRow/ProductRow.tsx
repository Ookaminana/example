import React, { FC } from 'react'
import { Product as ProductType } from '../../../../types'
import styles from '../ElemTableStyle.module.scss'
import { ReactComponent as Edit } from '../../../../assets/icons/edit.svg'
import { ReactComponent as Del } from '../../../../assets/icons/delete.svg'

type Props = {
    product: ProductType
    onEdit: (product: ProductType) => void
    onDelete: (product: ProductType) => void
}

const ProductRow: FC<Props> = ({ product, onEdit, onDelete }) => {
    return (
        <div className={styles.mainRow}>
            <div className={styles.leftPartTable}>
                <div className={styles.column}>
                    <span className={styles.nameItem}>{product.name}</span>
                </div>

                <div className={styles.column}>
                    <span className={styles.nameItem}>
                        {product.brand_name}
                    </span>
                </div>

                <div className={styles.column}>
                    <div
                        className={styles.photo}
                        style={{
                            backgroundImage: product.logo
                                ? `url("${product.logo}`
                                : 'none',
                        }}
                    />
                </div>
            </div>

            <div className={styles.rightPartTable}>
                <div className={styles.icons} onClick={() => onEdit(product)}>
                    <Edit />
                </div>
                <div className={styles.icons} onClick={() => onDelete(product)}>
                    <Del />
                </div>
            </div>
        </div>
    )
}

export default ProductRow
