<script>
    import { getSkill } from "~/job_posting/index/api";
    import { request } from "~/job_posting/index/store";

    let skillKeyword = "";
    let isSkillHided = true;

    $: searchedSkills = getSkill(skillKeyword);

    function addSkill(skillName) {
        searchedSkills = [];
        request.addSkill(skillName);
    }

    function removeSkill(skillName) {
        request.removeSkill(skillName);
    }

    function switchHidedSkill() {
        isSkillHided = !isSkillHided;
    }
</script>

<div class="sc-dkqQuH eYcCqs">
    <button type="button" class="outlined btn_hover" on:click={switchHidedSkill}
        ><span>기술스택 <mark /></span><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            class="arrow"
            class:arrow_up={!isSkillHided}
            ><g fill="none" fill-rule="evenodd"
                ><g
                    ><g
                        ><g
                            ><g
                                ><path
                                    d="M0 0H16V16H0z"
                                    transform="translate(-316 -224) translate(20 216) translate(224) translate(72 8)"
                                /><path
                                    stroke="#CCC"
                                    stroke-width="1.2"
                                    d="M3 6L8 11 13 6"
                                    transform="translate(-316 -224) translate(20 216) translate(224) translate(72 8)"
                                /></g
                            ></g
                        ></g
                    ></g
                ></g
            ></svg
        ></button
    >
    {#if !isSkillHided}
        <div type="기술스택" class="sc-cVAmsi fKqAid">
            <div class="sc-kHxTfl hfYXAq">
                <div class="close_button_wrap">
                    <button
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            ><g fill="none" fill-rule="evenodd"
                                ><g
                                    ><g
                                        ><path
                                            d="M0 0H24V24H0z"
                                            transform="translate(-316 -20) translate(316 20)"
                                        /><g stroke="#000" stroke-width="2"
                                            ><path
                                                d="M16 0L0 16M0 0L16 16"
                                                transform="translate(-316 -20) translate(316 20) translate(4 4)"
                                            /></g
                                        ></g
                                    ></g
                                ></g
                            ></svg
                        ></button
                    >
                </div>
                <h1>기술스택</h1>
            </div>
            <div class="layer_contents">
                <div>
                    <div class="sc-bGaVxB kgzeMx">
                        <div class="sc-fydGpi jTMKtk">
                            <input
                                type="text"
                                placeholder="ex) javascript"
                                bind:value={skillKeyword}
                            /><button type="button" class="sc-gnnDb dizmKV"
                                ><svg
                                    width="24"
                                    height="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    ><g fill="none" fill-rule="evenodd"
                                        ><circle
                                            stroke="#C4C4C4"
                                            stroke-width="1.2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            cx="11.111"
                                            cy="10.111"
                                            r="7.111"
                                        /><path
                                            stroke="#C4C4C4"
                                            stroke-width="1.2"
                                            d="m21 20-4.867-4.867"
                                        /></g
                                    ></svg
                                ></button
                            >
                        </div>
                        <div>
                            {#await searchedSkills}
                                <span>Finding...</span>
                            {:then skills}
                                <ul class="sc-igXgud fkcmCF">
                                    {#each skills as {defaultName}}
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <li
                                            class="sc-JEhMO hWoVqF"
                                            on:click={() => addSkill(defaultName)}
                                        >
                                            <span>{defaultName}</span>
                                        </li>
                                    {/each}
                                </ul>
                            {:catch error}
                                <span>Fail!</span>
                            {/await}
                        </div>
                        {#if $request.skillNames.length !== 0}
                            <div class="bpaCoL">
                                <h4 class="title">선택한 기술 스택</h4>
                                <div class="lists">
                                    {#each $request.skillNames as skillName}
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <div
                                            class="btn_stack cursor_default"
                                            on:click={() => removeSkill(skillName)}
                                        >
                                            <span class="text"
                                                >{skillName}</span
                                            ><button class="delete_btn"
                                                ><span class="blind">삭제</span
                                                ></button
                                            >
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="layer_bottom">
                <button type="button">초기화</button><button
                    type="button"
                    class="btn_apply">적용하기</button
                >
            </div>
        </div>
    {/if}

    <div role="presentation" class="sc-ksHpcM jsSzDN">
        {#each $request.skillNames as skillName}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="btn_stack cursor_default"
                on:click={() => removeSkill(skillName)}
            >
                <span class="text">{skillName}</span>
            </div>
        {/each}
    </div>
</div>


<style>
    .hfYXAq {
        display: none;
    }
    .eYcCqs {
        position: relative;
        margin: 0px 0px 1px;
        width: 360px;
    }
    .eYcCqs .btn_hover {
        border: 1px solid rgb(0, 0, 0);
    }
    .eYcCqs .outlined {
        position: relative;
        background-color: rgb(255, 255, 255);
        padding: 6px 30px 7px 12px;
        border: 1px solid rgb(228, 228, 228);
        border-radius: 100px;
        margin-bottom: 8px;
        text-align: left;
        box-sizing: border-box;
        z-index: 4;
    }
    .eYcCqs .btn_hover span {
        color: rgb(0, 0, 0);
    }
    .eYcCqs .outlined span {
        font-size: 15px;
        line-height: 24px;
        letter-spacing: -0.5px;
        color: rgb(34, 34, 34);
    }
    .eYcCqs .arrow_up {
        transform: rotate(-180deg);
        transition: transform 0.2s ease-in-out 0s,
            -webkit-transform 0.2s ease-in-out 0s;
    }
    .eYcCqs .arrow {
        position: absolute;
        top: 11px;
        right: 12px;
        transition: transform 0.2s ease-in-out 0s,
            -webkit-transform 0.2s ease-in-out 0s;
    }

    .fKqAid {
        box-shadow: rgba(0, 0, 0, 0.12) 0px 8px 16px;
        background-color: rgb(255, 255, 255);
        position: absolute;
        top: 44px;
        left: 0px;
        border: 1px solid rgb(228, 228, 228);
        border-radius: 12px;
        z-index: 5;
        width: 360px;
    }

    .fKqAid .layer_contents {
        max-height: calc(100% - 56px);
        height: 350px;
        padding: 0px;
    }
    .fKqAid .layer_bottom {
        height: 56px;
        border-top: 1px solid rgb(228, 228, 228);
        padding: 0px 24px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }

    .jTMKtk {
        position: relative;
        border-radius: 4px;
        height: 40px;
        margin: 24px 24px 20px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        border: 1px solid rgb(0, 221, 109);
    }

    .jTMKtk > input[type="text"] {
        height: 100%;
        width: 240px;
        margin: 0px 0px 0px 16px;
        border: none;
        font-size: 14px;
    }

    .dizmKV {
        position: absolute;
        background-color: transparent;
        width: 20px;
        height: 40px;
        border: none;
        right: 16px;
        top: 2px;
    }

    .fkcmCF {
        max-height: 265px;
        overflow-y: auto;
    }

    .hWoVqF {
        font-size: 13px;
        border-radius: 8px;
        color: rgb(38, 38, 38);
        height: 44px;
        font-weight: 500;
        margin: 0px 8px;
        cursor: pointer;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
    }

    .hWoVqF span {
        margin-left: 6px;
    }

    .fKqAid .layer_bottom {
        height: 56px;
        border-top: 1px solid rgb(228, 228, 228);
        padding: 0px 24px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
    }

    .fKqAid .layer_bottom button {
        font-size: 15px;
        border: none;
        text-decoration: underline;
    }

    .bpaCoL {
        margin: 0px 24px 23px;
        max-height: 240px;
        overflow-y: auto;
    }
    .cursor_default {
        cursor: default;
    }
    .btn_stack {
        display: inline-block;
        cursor: pointer;
        width: fit-content;
        padding: 8px 16px;
        background-color: rgb(244, 244, 244);
        border-radius: 100px;
        margin: 0px 8px 8px 0px;
        font-size: 14px;
        font-family: Montserrat, "Noto Sans KR", -apple-system, system-ui,
            "Apple SD Gothic Neo", "Malgun Gothic", "Nanum Gothic", sans-serif;
        color: rgb(34, 34, 34);
        line-height: 16px;
        font-weight: 500;
    }
    .delete_btn {
        position: relative;
        top: -4px;
        width: 20px;
        height: 12px;
        color: rgb(255, 255, 255);
        background-color: transparent;
        padding: 0px;
        border: none;
    }
    .delete_btn::before {
        position: absolute;
        left: 7px;
        width: 12px;
        height: 1.3px;
        background-color: rgb(196, 196, 196);
        transform: rotate(45deg);
        content: "";
    }
    .delete_btn::after {
        position: absolute;
        left: 7px;
        width: 12px;
        height: 1.3px;
        background-color: rgb(196, 196, 196);
        transform: rotate(-45deg);
        content: "";
    }

    .blind {
        overflow: hidden;
        position: absolute;
        width: 1px;
        height: 1px;
        clip: rect(1px, 1px, 1px, 1px);
    }
</style>
