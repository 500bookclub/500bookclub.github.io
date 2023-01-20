---
layout: headerless
title: Set Password
loading: Setting Password
permalink: /passwd
---
<div id="docId" class="passwd"></div>
<div id="passwdFormModal" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title has-text-centered">Set Account Password</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <form id="passwdForm">
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" name="Password" type="password" placeholder="" required>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Confirm Password</label>
                        <div class="control">
                            <input class="input" name="cPassword" type="password" placeholder="" required>
                        </div>
                    </div>
                    <div class="field is-grouped">
                        <div class="control">
                            <button id="passwdSubmit" class="button is-link">Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    </div>