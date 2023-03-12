import React from 'react'

function SideNavTitle() {
    return (
        <>
            <svg className="bi me-2" width="40" height="32">
                <use xlinkHref={"#bootstrap"} />
            </svg>
            <span className="fs-4">Sidebar</span>
        </>
    )
}

export default SideNavTitle
