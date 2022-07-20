import {useRouter} from "next/router";
import Header from "../../components/Header";
import styles from '../../styles/pages/auth/callback/callback.module.css'
import axios from 'axios'
import {Oval} from "react-loading-icons";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {BottomSheet} from "react-spring-bottom-sheet";
import 'react-spring-bottom-sheet/dist/style.css'
import {Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import classNames from "classnames";

export default function Callback() {

    const router = useRouter()
    const config = {
        type: "spring",
        damping: 20,
        stiffness: 100
    };
    const [termsAgree, setTermsAgree] = useState({ terms1: false, terms2: false })
    const [termsSheet, setTermsSheet] = useState(false)
    const [typeSheet, setTypeSheet] = useState(false)
    const [profileSheet, setProfileSheet] = useState(false)
    const [selectTeen, setSelectTeen] = useState(false)
    const [selectAdult, setSelectAdult] = useState(false)
    const [formData, setFormData] = useState({
        agree_terms: false,
        name: '',
        age: '',
        type: '', // teenager 또는 adult
    })

    useEffect(()=>{
        if(!router.isReady) return;
        axios({
            method: 'post',
            url: 'http://localhost:2000/api/auth/login',
            data: {
                token: router.query.code
            },
            withCredentials: true,
        })
            .then(()=>{
                // 약관 동의했는지 확인
                axios({
                    method: 'get',
                    url: 'http://localhost:2000/api/auth/check/tos',
                    withCredentials: true,
                })
                    .then(r=>{
                        if (!r.data.agree_tos) {
                            // 기초정보 확인 페이지 이동
                            console.log('tos 동의 안함')
                            setTermsSheet(true)
                        } else {
                            // 홈으로 이동
                            console.log('동의 함=> 기본정보 다 채움')
                        }
                    })
                    .catch(e=>{
                        alert('처리 중 오류가 발생하였습니다. 이전 페이지로 돌아가 다시 로그인을 해주세요.')
                    })
            })
            .catch(e=>{
                alert('처리 중 오류가 발생하였습니다. 이전 페이지로 돌아가 다시 로그인을 해주세요.')
            })
    }, [router.isReady])
    const checkbox = (
        <Checkbox
            color='success'
            sx={{
                "&.Mui-focusVisible": {
                    display: 'none'
                },
            }}
            aria-label='1'
        />
    )
    return (
        <>
            <Header/>
            <div className={styles.container}>
                <motion.h1
                    transition={config}
                    initial={{ x: 25, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -25, opacity: 1 }}
                >
                    <div className={styles.box}>
                        <div className={styles.big_text}>로그인 중</div>
                        <div className={styles.small_text}>사용자의 로그인을 안전하게 처리하고 있습니다.</div>
                        <div className={styles.spinner}><Oval height='50px' stroke='#009b43' strokeWidth='3' /></div>
                    </div>
                </motion.h1>

                <BottomSheet
                    open={termsSheet}
                    header={(<div className={styles.bottom_title}>약관 동의</div>)}
                >
                    <div className={styles.bottom_box}>
                        <div className={styles.form}>
                            <div className={styles.terms_box}>
                                <div className={styles.terms_text}>
                                    [개인정보처리방침 위치]
                                </div>
                            </div>
                            <FormControlLabel
                                onClick={()=>{ termsAgree.terms1?setTermsAgree({...termsAgree, terms1: false}):setTermsAgree({...termsAgree, terms1: true}) }}
                                labelPlacement="start"
                                control={checkbox}
                                label={(<div className={styles.form_text}>개인정보처리방침에 동의합니다.</div>)} />
                            <div className={styles.terms_box}>
                                <div className={styles.terms_text}>
                                    [이용약관 위치]
                                </div>
                            </div>
                            <FormControlLabel
                                onClick={()=>{ termsAgree.terms2?setTermsAgree({...termsAgree, terms2: false}):setTermsAgree({...termsAgree, terms2: true}) }}
                                labelPlacement="start"
                                control={checkbox}
                                label={(<div className={styles.form_text}>이용약관에 동의합니다.</div>)} />
                        </div>
                    </div>
                    <div className={styles.bottom_button} onClick={()=>{
                        if (termsAgree.terms1 == true && termsAgree.terms2 == true) {
                            setFormData({...formData, agree_terms: true})
                            setTermsSheet(false)
                            setTypeSheet(true)
                        } else {
                            alert('모든 약관에 동의해주세요.')
                        }
                    }}>
                        <div className={styles.bottom_button_text}>
                            다음으로
                        </div>
                    </div>
                </BottomSheet>
                <BottomSheet
                    open={typeSheet}
                    header={(<div className={styles.bottom_title}>기본정보 입력</div>)}
                >
                    <div className={styles.bottom_box}>
                        <div className={styles.form}>
                            <div className={styles.form_box}>
                                <div className={styles.typeintro_text}>
                                    유형을 선택해주세요.
                                </div>
                                <div className={styles.type_box}>
                                        <div className={classNames(styles.type_teenager, selectTeen?styles.type_active:undefined)} onClick={()=>{
                                            selectTeen?setSelectTeen(false):setSelectTeen(true)
                                            selectAdult?setSelectAdult(false):undefined
                                        }}>
                                            <div className={styles.type_textbox}>
                                                <div className={styles.type_bigtext}>
                                                    청소년
                                                </div>
                                                <div className={styles.type_smalltext}>
                                                    만 13~18세 까지
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classNames(styles.type_adult, selectAdult?styles.type_active:undefined)} onClick={()=>{
                                            selectAdult?setSelectAdult(false):setSelectAdult(true)
                                            selectTeen?setSelectTeen(false):undefined
                                        }}>
                                            <div className={styles.type_textbox}>
                                                <div className={styles.type_bigtext}>
                                                    성인
                                                </div>
                                                <div className={styles.type_smalltext}>
                                                    만 19세 이상
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.bottom_button}
                        onClick={()=>{
                            if(selectTeen == true && selectAdult == false) {
                                setFormData({...formData, type: 'teenager'})
                            } else if (selectTeen == false && selectAdult == true) {
                                setFormData({...formData, type: 'adult'})
                            } else {
                                alert('청소년/성인 중 선택해주세요.')
                                return
                            }
                            setTypeSheet(false)
                            setProfileSheet(true)
                        }}
                    >
                        <div className={styles.bottom_button_text}>
                            다음으로
                        </div>
                    </div>
                </BottomSheet>
                <BottomSheet
                    open={profileSheet}
                    header={(<div className={styles.bottom_title}>약관 동의</div>)}
                >
                    <div className={styles.bottom_box}>
                        <div className={styles.form}>
                            <div className={styles.form_box}>
                                <div className={styles.typeintro_text_mini}>
                                    {formData.type=='teenager'?'청소년':'성인'}을 선택하셨습니다.
                                </div>
                                <div className={styles.typeintro_text} style={{marginBottom: '1rem'}}>
                                    기초 정보를 입력해주세요.
                                </div>
                                <TextField fullWidth label="이름" id="fullWidth" helperText="이름을 입력해주세요."/>
                                <TextField fullWidth label="이름" id="fullWidth" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom_button} onClick={()=>{

                    }}>
                        <div className={styles.bottom_button_text}>
                            다음으로
                        </div>
                    </div>
                </BottomSheet>
            </div>
        </>
    );
}