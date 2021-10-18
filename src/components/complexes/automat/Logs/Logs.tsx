import React, { FC, useEffect, useRef, useState } from 'react'
import { AutomatLog, AutomatLogLevels } from '../../../../types'
import { Automats as AutomatsService } from '../../../../services/Automats'
import { LogItem } from './LogItem'
import styles from './Logs.module.scss'
import { Spinner } from '../../../simples/Spinner'

type Props = {
    automatId: number
}

const Logs: FC<Props> = ({ automatId }) => {
    const [logs, setLogs] = useState<Array<AutomatLog>>([])
    const logsCurrent = useRef<Array<AutomatLog>>(logs)
    logsCurrent.current = logs
    const [loading, setLoading] = useState(false)
    const offset = useRef(0)
    const has = useRef(true)

    const loadLogs = async () => {
        if (!has.current || loading) {
            return
        }

        setLoading(true)

        const result = await AutomatsService.getLogs({
            automatId,
            offset: offset.current,
        })

        setLoading(false)

        if (!result) {
            has.current = false
            return
        }

        const newLogs = [...logsCurrent.current, ...result]
        offset.current = newLogs.length
        setLogs(newLogs)
    }

    useEffect(() => {
        setLogs([])
        offset.current = 0
        has.current = true

        if (!automatId) {
            return
        }

        loadLogs().then()
    }, [automatId])

    const listRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const reached = useRef(false)

    const handleScroll = async () => {
        if (!listRef.current || !containerRef.current) {
            return
        }

        const listHeight = listRef.current.offsetHeight
        const containerHeight = containerRef.current.offsetHeight
        const scrollTop = listRef.current.scrollTop

        if (containerHeight <= listHeight) {
            return
        }

        const afterEndReach =
            containerHeight - (scrollTop + listHeight) < listHeight / 2

        if (afterEndReach && !reached.current) {
            reached.current = true
            await loadLogs()
        } else if (!afterEndReach && reached.current) {
            reached.current = false
        }
    }

    return (
        <div className={styles.root}>
            <h2 className={styles.header}>Сообщение от автомата</h2>

            <div className={styles.content}>
                <div
                    className={styles.logsList}
                    ref={listRef}
                    onScroll={handleScroll}
                >
                    {logs.length > 0 ? (
                        <div
                            className={styles.logListContainer}
                            ref={containerRef}
                        >
                            {logs.map((log) => (
                                <LogItem log={log} key={log.id} />
                            ))}
                        </div>
                    ) : !loading ? (
                        <div className={styles.empty}>Нет сообщений.</div>
                    ) : null}

                    {loading && (
                        <div className={styles.loader}>
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Logs
