---
layout: headerless
title: Forgot Password
loading: Loading
permalink: /forgotPassword
---
<div id="docId" class="forgotPassword"></div>
<div id="forgotPasswdFormModal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title has-text-centered">Forgot Password</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <form id="forgotPasswdForm">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" name="Email" type="email" placeholder="Email">
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button id="forgotPasswdSubmit" class="button is-link">Reset</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </div>