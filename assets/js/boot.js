document.addEventListener('DOMContentLoaded', () => {
    let isActivate = document.querySelector("#docId")
    try {
        let docId = isActivate.classList[0]
        switch (docId) {
            case "c_activate":
                let activateToken = getQueryParam('activateToken')
                if (!activateToken) {
                    windows.csystem.showError("Activation Code not found.")
                    window.location.href = window.location.href.split("activate")[0]
                }
                fetch(`${window.site.API}/api/noauth/activate?activateToken=` + activateToken, {
                    method: "GET"
                })
                    .then(async (response) => {
                        hideLoading()
                        let data = {}
                        try {
                            data = await response.json()
                        } catch (error) {
                        }
                        if (!response.ok) {
                            if (response.status === 500) {
                                window.csystem.unknownError()
                                return
                            }
                            Object.keys(data).map((key) => {
                                let val = data[key]
                                try {
                                    window.csystem.showError(val)
                                } catch (error) { }
                            })
                        } else {
                            let code = data["Code"]
                            window.location.href = `${window.location.href.split("activate")[0]}passwd?Code=${code}`
                        }
                    })
                    .catch(error => {
                        hideLoading()
                        window.csystem.failedToConnect()
                    }
                    );
                break;
            case "passwd":
                break
            case "forgotPassword":
                break
            case "githubLogin":
                let code = getQueryParam('code')
                if (!code) {
                    window.csystem.showError("Github code not found.")
                    window.location.href = window.location.href.split("github_login")[0]
                }
                fetch(`${window.site.API}/api/auth/social/github?clientID=${window.site.CLIENT_IDS["GITHUB"]}&Code=` + code, {
                    method: "GET"
                })
                    .then(async (response) => {
                        hideLoading()
                        let data = {}
                        try {
                            data = await response.json()
                        } catch (error) { }
                        if (!response.ok) {
                            if (response.status === 500) {
                                window.csystem.showError("An unknown error occured.")
                                return
                            }
                            Object.keys(data).map((key) => {
                                let val = data[key]
                                try {
                                    window.csystem.showError(val)
                                } catch (error) {
                                    window.location.href = window.csystem.getlastWinLocation()
                                }
                            })
                        } else {
                            window.csystem.showSuccess("Log in successful")
                            window.csystem.setToken(data)
                            window.location.href = window.csystem.getlastWinLocation()
                        }
                    })
                    .catch(error => {
                        hideLoading()
                        window.csystem.failedToConnect()
                    }
                    );
                break
            case "linkedinLogin":
                {
                    let code = getQueryParam('code')
                    if (!code) {
                        window.csystem.showError("LinkedIn code not found.")
                        window.location.href = window.location.href.split("github_login")[0]
                    }
                    fetch(`${window.site.API}/api/auth/social/linkedin?clientID=${window.site.CLIENT_IDS["LINKEDIN"]}&Code=${code}&redirect_uri=${encodeURIComponent(window.csystem.baseUrl + "/linkedin_login")}`, {
                        method: "GET"
                    })
                        .then(async (response) => {
                            hideLoading()
                            let data = {}
                            try {
                                data = await response.json()
                            } catch (error) { }
                            if (!response.ok) {
                                if (response.status === 500) {
                                    window.csystem.showError("An unknown error occured.")
                                    return
                                }
                                Object.keys(data).map((key) => {
                                    let val = data[key]
                                    try {
                                        window.csystem.showError(val)
                                    } catch (error) {
                                        window.location.href = window.csystem.getlastWinLocation()
                                    }
                                })
                            } else {
                                window.csystem.showSuccess("Log in successful")
                                window.csystem.setToken(data)
                                window.location.href = window.csystem.getlastWinLocation()
                            }
                        })
                        .catch(error => {
                            hideLoading()
                            window.csystem.failedToConnect()
                        }
                        );
                }
                break
            case "twitterLogin":
                {
                    let code = getQueryParam('code')
                    if (!code) {
                        window.csystem.showError("Twitter code not found.")
                        window.location.href = window.location.href.split("github_login")[0]
                    }
                    fetch(`${window.site.API}/api/auth/social/twitter?clientID=${window.site.CLIENT_IDS["TWITTER"]}&Code=${code}&redirect_uri=${encodeURIComponent(window.csystem.baseUrl + "/twitter_login")}`, {
                        method: "GET"
                    })
                        .then(async (response) => {
                            hideLoading()
                            let data = {}
                            try {
                                data = await response.json()
                            } catch (error) { }
                            if (!response.ok) {
                                if (response.status === 500) {
                                    window.csystem.showError("An unknown error occured.")
                                    return
                                }
                                Object.keys(data).map((key) => {
                                    let val = data[key]
                                    try {
                                        window.csystem.showError(val)
                                    } catch (error) {
                                        window.location.href = window.csystem.getlastWinLocation()
                                    }
                                })
                            } else {
                                window.csystem.showSuccess("Log in successful")
                                window.csystem.setToken(data)
                                window.location.href = window.csystem.getlastWinLocation()
                            }
                        })
                        .catch(error => {
                            hideLoading()
                            window.csystem.failedToConnect()
                        }
                        );
                }
                break
            case "facebookLogin":
                {
                    let code = getQueryParam('code')
                    if (!code) {
                        window.csystem.showError("Facebook code not found.")
                        window.location.href = window.location.href.split("github_login")[0]
                    }
                    fetch(`${window.site.API}/api/auth/social/facebook?clientID=${window.site.CLIENT_IDS["FACEBOOK"]}&Code=${code}&redirect_uri=${encodeURIComponent(window.csystem.baseUrl + "/facebook_login")}`, {
                        method: "GET"
                    })
                        .then(async (response) => {
                            hideLoading()
                            let data = {}
                            try {
                                data = await response.json()
                            } catch (error) { }
                            if (!response.ok) {
                                if (response.status === 500) {
                                    window.csystem.showError("An unknown error occured.")
                                    return
                                }
                                Object.keys(data).map((key) => {
                                    let val = data[key]
                                    try {
                                        window.csystem.showError(val)
                                    } catch (error) {
                                        window.location.href = window.csystem.getlastWinLocation()
                                    }
                                })
                            } else {
                                window.csystem.showSuccess("Log in successful")
                                window.csystem.setToken(data)
                                window.location.href = window.csystem.getlastWinLocation()
                            }
                        })
                        .catch(error => {
                            hideLoading()
                            window.csystem.failedToConnect()
                        }
                        );
                }
                break
        }
    } catch (error) {
        console.error(error)
    }
});