
try {
    const registerSubmitBtn = document.querySelector("#registerSubmit");
    const loginSubmitBtn = document.querySelector("#loginSubmitBtn");

    loginSubmitBtn.addEventListener("click", function (event) {

        let inputNamesMap = {
            "Email": 'Email',
            "Password": 'Password'
        }
        event.preventDefault();
        const form = document.querySelector("#loginForm");
        attachFieldEvents(form)
        let allFields = form.querySelectorAll("input, select, textarea");
        allFields.forEach(function (field) {
            field.setCustomValidity('')
            form.reportValidity()
        })
        let noErrors = form.reportValidity()
        if (!noErrors) return;

        const data = {
            "Email": document.querySelector("input[name='Email']").value,
            "Password": document.querySelector("input[name='Password']").value
        };

        showLoading()
        fetch(`${window.site.API}/api/auth/login`, {
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
                            message: "An unknown error occured. Try signing in again.",
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
                    window.location.reload();
                }
            })
            .catch(error => {
                hideLoading()
                window.csystem.failedToConnect();
            }
            );
    });



    registerSubmitBtn.addEventListener("click", function (event) {

        let inputNamesMap = {
            "Email": 'email',
            "FirstName": 'firstName',
            "LastName": 'lastName',
            "Gender": 'gender',
            "Telephone": 'phoneNumber',
            "DateOfBirth": 'dob'
        }
        event.preventDefault();
        const form = document.querySelector("#registrationForm");
        attachFieldEvents(form)
        let allFields = form.querySelectorAll("input, select, textarea");
        allFields.forEach(function (field) {
            field.setCustomValidity('')
            form.reportValidity()
        })

        let noErrors = form.reportValidity()
        if (!noErrors) return;

        const data = {
            "Email": document.querySelector("input[name='email']").value,
            "FirstName": document.querySelector("input[name='firstName']").value,
            "LastName": document.querySelector("input[name='lastName']").value,
            "Gender": document.querySelector("select[name='gender']").value,
            "Telephone": document.querySelector("input[name='phoneNumber']").value,
            "DateOfBirth": document.querySelector("input[name='dob']").value
        };

        showLoading()
        data["activationPage"] = `${window.location.origin}/${window.activationPage}`
        fetch(`${window.site.API}/api/noauth/user?activationPage=` + data["activationPage"], {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(async (response) => {
                hideLoading()
                let data = {}
                try {
                    data = await response.json()
                } catch (error) {
                    bulmaToast.toast({
                        message: "An unknown error occured. Trying resending or checking your email for activation code.",
                        type: "is-danger",
                        position: 'bottom-center',
                        duration: 5000,
                        closeOnClick: true,
                        opacity: 0.8,

                    })

                }
                if (!response.ok) {
                    if (response.status === 500) {
                        bulmaToast.toast({
                            message: "An unknown error occured. Trying resending or checking your email for activation code.",
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
                        message: "Account has successfully been created. You can now log in",
                        type: "is-success",
                        position: 'bottom-center',
                        duration: 5000,
                        closeOnClick: true,
                        opacity: 0.8,

                    })
                    document.querySelector("#loginformRegister").classList.remove("is-active")
                }
            })
            .catch(error => {
                hideLoading()
                window.csystem.failedToConnect();
            });
    });
} catch (error) { }