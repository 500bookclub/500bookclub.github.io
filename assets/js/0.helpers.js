function showLoading() {
    document.querySelector(".pageloader").classList.add('is-active');
}

function hideLoading() {
    document.querySelector(".pageloader").classList.remove('is-active');
}

function getQueryParam(key) {
    let ret
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
        if (pair[0] === key) ret = pair[1]
    }
    return ret
}

function attachFieldEvents(form) {
    const fields = form.querySelectorAll("input, select, textarea");
    for (const field of fields) {
        field.addEventListener("input", function () {
            field.setCustomValidity('')
            field.reportValidity()
            field.classList.remove("invalid")
        });
        field.addEventListener("keyup", function () {
            field.setCustomValidity('')
            field.reportValidity()
            field.classList.remove("invalid")
        });
    }
}

const projectName = window.site.title
window.activationPage = "activate"
window.passwdPage = "passwd"

class csystem {
    constructor() {
        this.GIT_CLIENT_ID = window.site.CLIENT_IDS["GITHUB"]
        this.IN_CLIENT_ID = window.site.CLIENT_IDS["LINKEDIN"]
        this.TWITTER_CLIENT_ID = window.site.CLIENT_IDS["TWITTER"]
        this.FB_CLIENT_ID = window.site.CLIENT_IDS["FACEBOOK"]
        this.baseUrl = window.location.protocol + "//" + window.location.host + window.site.baseurl
        this.tokenName = `${projectName}TokenGSAC`
        this.refreshTokenName = `${projectName}refreshTokenGSAC`

        // resetting pasword
        try {
            const forgotPasswdSubmit = document.querySelector("#forgotPasswdSubmit");
            forgotPasswdSubmit.addEventListener("click", (event) => { this.submitResetpassword(event) })
        } catch (error) { }
        try {
            const loginwithGithub = document.querySelector("#loginwithGithub");
            loginwithGithub.addEventListener("click", (event) => { this.loginWithGitHub(event) })
        } catch (error) {
            console.error(error)
        }
        try {
            const loginWithLinkedIn = document.querySelector("#loginWithLinkedIn");
            loginWithLinkedIn.addEventListener("click", (event) => { this.loginWithLinkedIn(event) })
        } catch (error) { }
        try {
            const loginWithFb = document.querySelector("#loginWithFb");
            loginWithFb.addEventListener("click", (event) => {this.loginWithFb(event) })
        } catch (error) {
            console.error(error)
        }
        try {
            const loginWithTwitter = document.querySelector("#loginWithTwitter");
            loginWithTwitter.addEventListener("click", (event) => { this.loginWithTwitter(event) })
        } catch (error) { }
    }

    setlastWinLocation = () => {
        window.localStorage.setItem("lastLocation", window.location.href);
    }
    getlastWinLocation = () => {
        return window.localStorage.getItem("lastLocation");
    }

    loginWithGitHub = () => {
        // Redirect to GitHub's OAuth login page
        this.setlastWinLocation()
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.GIT_CLIENT_ID}&scope=user:email`;
    }
    loginWithFb = () => {
        this.setlastWinLocation()
        window.location.href = `https://www.facebook.com/v2.0/dialog/oauth?client_id=${this.FB_CLIENT_ID}&scope=email&redirect_uri=${encodeURIComponent(this.baseUrl + "/facebook_login")}&state=state`;
    }
    loginWithTwitter = () => {
        this.setlastWinLocation()
        window.location.href = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${this.TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(this.baseUrl + "/twitter_login")}&scope=users.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
    }
    loginWithLinkedIn = () => {
        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?client_id=${this.IN_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(this.baseUrl + "/linkedin_login")}&scope=r_liteprofile%20r_emailaddress`;
    }

    goHome(){
        let url = `${window.location.origin}/${window.site.baseurl}`
        window.location.href = url
    }

    failedToConnect(){
        this.showError("Failed to connect to server.")
    }
    unknownError(){
        this.showError("An unknown error occured. Trying resending or checking your email for activation code.")
    }
    showError(val){
        bulmaToast.toast({
            message: val,
            type: "is-danger",
            position: 'bottom-center',
            duration: 5000,
            closeOnClick: true,
            opacity: 0.8,

        })
    }

    showSuccess(val){
        bulmaToast.toast({
            message: val,
            type: "is-success",
            position: 'bottom-center',
            duration: 5000,
            closeOnClick: true,
            opacity: 0.8,

        })
    }

    submitResetpassword(event) {
        let inputNamesMap = {
            "Email": 'Email',
            "Password": 'Password'
        }
        event.preventDefault();
        const form = document.querySelector("#forgotPasswdForm");
        attachFieldEvents(form)
        let allFields = form.querySelectorAll("input, select, textarea");
        allFields.forEach(function (field) {
            console.log(field)
            field.setCustomValidity('')
            form.reportValidity()
        })
        let noErrors = form.reportValidity()
        if (!noErrors) return;

        const data = {
            "Email": document.querySelector("input[name='Email']").value,
        };

        showLoading()
        data["passwdPage"] = `${window.location.origin}/${window.passwdPage}`
        fetch(`${window.site.API}/api/noauth/forgotPassword`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(async (response) => {
                hideLoading()
                let data = {}
                try {
                    data = await response.json()
                } catch (error) { }
                if (!response.ok) {
                    if (response.status === 500) {
                        bulmaToast.toast({
                            message: "An unknown error occured. Please try again later.",
                            type: "is-danger",
                            position: 'bottom-center',
                            duration: 5000,
                            closeOnClick: true,
                            opacity: 0.8,

                        })
                        return
                    }
                    Object.keys(data).map((key) => {
                        let val = data[key]
                        try {
                            let field = form.querySelectorAll(`input[name='${inputNamesMap[key]}']`)[0];
                            field.setCustomValidity(val)
                            field.classList.add("invalid")
                            field.reportValidity();
                            bulmaToast.toast({
                                message: val,
                                type: "is-danger",
                                position: 'bottom-center',
                                duration: 5000,
                                closeOnClick: true,
                                opacity: 0.8,

                            })
                        } catch (error) { }
                    })
                } else {
                    bulmaToast.toast({
                        message: "Log in successful",
                        type: "is-success",
                        position: 'bottom-center',
                        duration: 5000,
                        closeOnClick: true,
                        opacity: 0.8,

                    })
                    window.csystem.setToken(data)
                    // window.location.reload();
                }
            })
            .catch(error => {
                hideLoading()
                window.csystem.failedToConnect()
            }
            );



    }
    setToken = (tokenData) => {
        let token = tokenData.token;
        let refreshToken = tokenData.refreshToken;
        window.localStorage.setItem(this.tokenName, token);
        window.localStorage.setItem(this.refreshTokenName, refreshToken);
        this.jwt_token = token
        return;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.csystem = new csystem()
})