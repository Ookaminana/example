import React, { FC, useRef } from 'react'
import styles from './Layout.module.scss'
import { Header } from '../Header'
import { LeftSidebar } from '../LeftSidebar'
import { Toasts } from '../Toasts'

export type LayoutScrollEvent = {
    scrollTop: number
}

type Props = {
    onEndReached?: () => void
}

const Layout: FC<Props> = ({ onEndReached, children }) => {
    const mainRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const reached = useRef(false)

    const handleScroll = () => {
        if (!mainRef.current || !contentRef.current) {
            return
        }

        const mainHeight = mainRef.current.offsetHeight
        const contentHeight = contentRef.current.offsetHeight
        const scrollTop = mainRef.current.scrollTop

        if (contentHeight <= mainHeight) {
            return
        }

        const afterEndReach =
            contentHeight - (scrollTop + mainHeight) < mainHeight / 2

        if (afterEndReach && !reached.current) {
            reached.current = true
            onEndReached && onEndReached()
        } else if (!afterEndReach && reached.current) {
            reached.current = false
        }
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.leftSidebarWrap}>
                <LeftSidebar />
            </div>

            <div className={styles.right} ref={mainRef} onScroll={handleScroll}>
                <div ref={contentRef}>
                    <Header />
                    <div className={styles.main}>{children}</div>
                </div>
            </div>

            <Toasts />
        </div>
    )
}

export default Layout
