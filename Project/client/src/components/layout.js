import React, { Children } from "react";
import '../layout.css'

function Layout (children) {
    return(
        <div className="main">

            <div className="d-flex layout">
                <div className="sidebar">
                    sidebar

                </div>
                <div className="content">
                    <div className="content-header">
                        header
                    </div>
                    <div className="content-body">
                        {Children.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;