

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

try {
    const submitBtn = document.querySelector("#passwdSubmit");
    submitBtn.addEventListener("click", function (event) {
        let inputNamesMap = {
            "Code": 'Code',
            "Password": 'Password'
        }

        event.preventDefault();
        const form = document.querySelector("#passwdForm");
        attachFieldEvents(form)
        let allFields = form.querySelectorAll("input, select, textarea");
        allFields.forEach(function (field) {
            field.setCustomValidity('')
            form.reportValidity()
        })

        let noErrors = form.reportValidity()
        if (!noErrors) return;

        let password = document.querySelector("input[name='Password']").value,
            cPassword = document.querySelector("input[name='cPassword']").value
        if (password != cPassword) {
            document.querySelector("input[name='cPassword']").setCustomValidity("Passwords don't match")
            form.reportValidity()
            return
        }
        const data = {
            "Password": document.querySelector("input[name='Password']").value,
            "Code": getQueryParam('Code')
        };

        showLoading()
        data["activationPage"] = `${window.location.origin}/${window.activationPage}`
        fetch(`${window.site.API}/api/noauth/resetPassword`, {
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
                            message: "An unknown error occured. Trying resending or checking your email for activation code.",
                            type: "is-danger",
                            position: 'bottom-center',
                            duration: 5000,
                            closeOnClick: true,
                            opacity: 0.8,

                        })
                        return
                    }
                    // response.json().then(data => {
                    Object.keys(data).map((key) => {
                        let val = data[key]
                        window.csystem.showError(val)
                        try {
                            let field = form.querySelectorAll(`input[name='${inputNamesMap[key]}']`)[0];
                            field.setCustomValidity(val)
                            field.classList.add("invalid")
                            field.reportValidity();

                        } catch (error) { }
                    })
                } else {
                    form.reset()
                    window.csystem.showSuccess("Password has been set. You can now log in")
                    window.csystem.goHome();
                }
            })
            .catch(error => {
                hideLoading()
                window.csystem.failedToConnect()
            }
            );
    });
} catch (error) { }