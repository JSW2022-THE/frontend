import { useRouter } from "next/router";
import Header from "../../../components/Header";
import styles from '../../../styles/pages/contract/confirm/confirm.module.css'
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl, FormControlLabel,
    FormGroup,
    FormLabel,
    InputAdornment,
    MenuItem, Radio, RadioGroup,
    Stack,
    TextField
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {ko} from "date-fns/locale";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {MobileDatePicker} from "@mui/x-date-pickers/MobileDatePicker";
import SignatureCanvas from "react-signature-canvas";
import ReplayIcon from "@mui/icons-material/Replay";
import axios from "axios";
import Alert from '@mui/material/Alert';
import ReactCodeInput from "react-verification-code-input";
import OtpInput from "react-otp-input";
import {withStyles} from "@mui/styles";

const View = () => {

    const router = useRouter();
    const contract_uuid = router.query.contract_uuid
    const [workTimeText, setWorkTimeText] = useState()
    const [workLocationText, setWorkLocationText] = useState()
    const [endDateText, setEndDateText] = useState()
    const [workWeekText, setWorkWeekText] = useState()
    const signCanvas = useRef()
    const [loadingView, setLoadingView] = useState(
        <div className={styles.loading_container}>
            <div className={styles.loading_box}>
                <div className={styles.info}>
                    <CircularProgress style={{width: '1.5rem', height: '1.5rem', marginLeft: '1.5rem', position: 'absolute', marginTop: '1.375rem'}} color='success' />
                    <div className={styles.title}>
                        계약서를 불러오는 중
                    </div>
                </div>
            </div>
        </div>
    )
    const [formData, setFormData] = useState({
        company_name: '',
        ceo_name: '',
        company_number: '',
        contract_start_date: '',
        contract_end_date: '',
        work_location: '',
        work_info: '',
        work_week_time: '',
        work_type: '',
        work_start_time: '',
        work_end_time: '',
        wage_type: '',
        wage_value: '',
        bonus_percent: '',
        wage_send_type: '',
        insurance: {
            goyong: false,
            sanjae: false,
            kookmin: false,
            gungang: false,
        },
        rest_start_time: '',
        rest_end_time: '',
        work_week_num: '',
        document: {
            family: false,
            agreement: false,
        },
        worker_name: '',
        work_rest_day: '',
    })
    const DarkerDisabledTextField = withStyles({
        root: {
            marginRight: 8,
            "& .MuiInputBase-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)"
            }
        }
    })(TextField);
    const formView = (
        <div className={styles.input_box}>
            <LocalizationProvider adapterLocale={ko} dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    {/* 회사이름, 사장님 이름 등 가게 정보는 미리 입력됨. */}
                    <TextField
                        required
                        fullWidth
                        label="회사 이름(사업체명)"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{ readOnly: true,style: { fontFamily: 'pretendard', fontWeight: 500} }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500} }}
                        color='success'
                        value={formData.company_name|| ''}
                    />
                    <TextField
                        required
                        fullWidth
                        label="사장님 이름(사업주명)"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                        value={formData.ceo_name|| ''}
                    />
                    <TextField
                        required
                        fullWidth
                        label="회사 대표번호(또는 사장님 번호)"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                        value={formData.company_number|| ''}
                    />
                    <TextField
                        required
                        label='계약 시작일'
                        fullWidth
                        variant="standard"
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                        value={formData.contract_start_date|| ''}
                    />
                    <TextField
                        required
                        label='계약 종료일'
                        fullWidth
                        variant="standard"
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                        value={formData.contract_end_date|| ''}
                    />
                    <TextField
                        required
                        fullWidth
                        label="근무장소(위치)"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                        helperText={workLocationText}
                        FormHelperTextProps={{
                            className: styles.info
                        }}
                        value={formData.work_location|| ''}
                    />
                    <TextField
                        required
                        fullWidth
                        label="업무의 내용"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                        value={formData.work_info|| ''}
                    />
                    <TextField
                        required
                        fullWidth
                        label="주소정근로시간(일하기로 정한 시간)"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{
                            style: { fontFamily: 'pretendard', fontWeight: 500 },
                            startAdornment: <InputAdornment position="start"><div className={styles.info}>주</div></InputAdornment>,
                            endAdornment: <InputAdornment position="end"><div className={styles.info}>시간</div></InputAdornment>,
                            readOnly: true
                        }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                        helperText={workWeekText}
                        FormHelperTextProps={{
                            className: styles.info
                        }}
                        value={formData.work_week_time|| ''}
                    />
                    <TextField
                        label="근무형태"
                        required
                        fullWidth
                        className={styles.info}
                        variant="standard"
                        hiddenLabel={false}
                        color='success'
                        value={formData.work_type|| ''}
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                    />
                    <TextField
                        label="휴일"
                        required
                        fullWidth
                        className={styles.info}
                        variant="standard"
                        hiddenLabel={false}
                        color='success'
                        value={formData.work_rest_day|| ''}
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                    />
                    <TextField
                        label="근무시작시간"
                        required
                        fullWidth
                        className={styles.info}
                        variant="standard"
                        hiddenLabel={false}
                        color='success'
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        helperText={workTimeText}
                        value={formData.work_start_time|| ''}
                        FormHelperTextProps={{
                            className: styles.info
                        }}
                    />
                    <TextField
                        label="근무종료시간"
                        required
                        fullWidth
                        className={styles.info}
                        variant="standard"
                        hiddenLabel={false}
                        color='success'
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        helperText={workTimeText}
                        value={formData.work_end_time|| ''}
                        FormHelperTextProps={{
                            className: styles.info
                        }}
                    />
                    <TextField
                        label="휴식시작시간"
                        required
                        fullWidth
                        className={styles.info}
                        variant="standard"
                        hiddenLabel={false}
                        color='success'
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        value={formData.rest_start_time|| ''}
                    />
                    <TextField
                    label="휴식종료시간"
                    fullWidth
                    required
                    className={styles.info}
                    variant="standard"
                    hiddenLabel={false}
                    color='success'
                    InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                    value={formData.rest_end_time|| ''}
                />
                    <FormGroup row={true} className={styles.moneyForm}>
                        <TextField
                            label="임금 유형"
                            required
                            className={styles.info}
                            variant="standard"
                            hiddenLabel={false}
                            color='success'
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: true }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            style={{width:'30%'}}
                            value={formData.wage_type|| ''}
                        />
                        <TextField
                            variant="standard"
                            label="임금"
                            color='success'
                            InputProps={{
                                style: { fontFamily: 'pretendard', fontWeight: 500 },
                                readOnly: true,
                                endAdornment: <InputAdornment position="end"><div className={styles.info}>만원</div></InputAdornment>
                            }}
                            style={{width:'70%'}}
                            value={formData.wage_value|| ''}
                        />
                    </FormGroup>
                    <TextField
                        required
                        fullWidth
                        label="상여금별도"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{
                            style: { fontFamily: 'pretendard', fontWeight: 500 },
                            endAdornment: <InputAdornment position="end"><div className={styles.info}>%</div></InputAdornment>,
                            readOnly: true
                        }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                        value={formData.bonus_percent|| ''}
                    />
                    <FormControl
                        required>
                        <FormLabel focused={false} className={styles.menuItem}>임금 지급방법</FormLabel>
                        <RadioGroup>
                            <FormControlLabel
                                value="근로자에게 직접지급"
                                control={<Radio disabled color="success" />}
                                label={<div className={styles.menuItem}>근로자에게 직접지급</div>}
                                checked={(formData.wage_send_type=='근로자에게 직접지급')?true:false}
                            />
                            <FormControlLabel
                                value="근로자 명의 예금통장에 입금"
                                control={<Radio disabled color="success" />}
                                label={<div className={styles.menuItem}>근로자 명의 에금통장에 입금</div>}
                                checked={(formData.wage_send_type=='근로자 명의 예금통장에 입금')?true:false}
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl required>
                        <FormLabel focused={false} className={styles.menuItem}>제출서류</FormLabel>
                        <RadioGroup>
                            <FormControlLabel
                                value="가족관계증명서"
                                control={<Checkbox disabled color="success" />}
                                label={<div className={styles.menuItem}>가족관계증명서</div>}
                                checked={formData.document.family}
                            />
                        </RadioGroup>
                        <RadioGroup>
                            <FormControlLabel
                                value="친권자 또는 후견인의 동의서"
                                control={<Checkbox disabled color="success" />}
                                label={<div className={styles.menuItem}>친권자 또는 후견인의 동의서</div>}
                                checked={formData.document.agreement}
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl required>
                        <FormLabel focused={false} className={styles.menuItem}>사회보험적용여부</FormLabel>
                        <RadioGroup>
                            <FormControlLabel
                                value="고용보험"
                                control={<Checkbox disabled color="success" />}
                                label={<div className={styles.menuItem}>고용보험</div>}
                                checked={formData.insurance.goyong}
                            />
                            <FormControlLabel
                                value="산재보험"
                                control={<Checkbox disabled color="success" />}
                                label={<div className={styles.menuItem}>산재보험</div>}
                                checked={formData.insurance.sanjae}
                            />
                            <FormControlLabel
                                value="국민연금"
                                control={<Checkbox disabled color="success" />}
                                label={<div className={styles.menuItem}>국민연금</div>}
                                checked={formData.insurance.kookmin}
                            />
                            <FormControlLabel
                                value="건강보험"
                                control={<Checkbox disabled color="success" />}
                                label={<div className={styles.menuItem}>건강보험</div>}
                                checked={formData.insurance.gungang}
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl required>
                        <FormLabel focused={false} style={{textAlign: 'center'}} className={styles.menuItem}>근로자 서명</FormLabel>
                        <SignatureCanvas ref={signCanvas} penColor='black' canvasProps={{className: styles.signCanvas}} redrawOnResize clearOnResize={false}/>
                        <Button style={{marginTop: '0.5rem'}} onClick={()=>signCanvas.current.clear()} color='success' className={styles.replayButton} variant="outlined" startIcon={<ReplayIcon />}>
                            서명 다시하기
                        </Button>
                    </FormControl>
                    <Button
                        color='success'
                        className={styles.sendButton}
                        variant="outlined"
                        size="large"
                    >
                        <strong>계약 동의 및 진행하기</strong>
                    </Button>
                </Stack>
            </LocalizationProvider>
        </div>
    )
    const [nowView, setNowView] = useState(false)
    const [errorView, setErrorView] = useState()
    const [passwordView, setPasswordView] = useState(false)
    const [buttonText, setButtonText] = useState('확인')
    const [code, setCode] = useState('')
    useEffect(()=>{
        if (!router.isReady) return
        setEndDateText(
            <>
                - 근로계약기간의 정함이 없는 경우에는 시작일만 입력하세요
                <br/>
                - 근로계약기간은 1년을 초과할 수 없습니다. 단 일정한 사업의 완료가 예정되어 있어서 사업기간이 정하여져 있는 경우에는 사업완료에 필요한 기간이 비록 1년을 초과하더라도 그 기간동안을 근로계약을 체결할 수 있습니다.
            </>
        )
        setWorkWeekText(
            <>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                - "주소정근로시간" 이라함은 근로자와 사용자가 정한 1주 동안 근로하는 근로시간을 말합니다.
                <br/>
                - 15세 이상 18세 미만 청소년의 근로시간은 1일에 7시간, 1주에 35시간을 초과하여 일할 수 없습니다. (「근로기준법」 제69조)
                <br/>
                - 예외적으로 사용자와 청소년 사이에 합의를 한 경우에는 하루에 1시간, 1주에 5시간을 한도로 연장하여 일할 수 있습니다. (「근로기준법」 제69조)
            </>
        )
        setWorkTimeText(
            <>
                - 원칙적으로 청소년은 밤 10시 이후로 근무할 수 없지만, 청소년이 형평상 어쩔 수 없이 근무해야 한다면 건강과 학업에 지장이 없는 선에서 청소년 본인이 동의하고 고용노동부 인가를 받으면 밤 10시부터 새벽 6시까지 일할 수 있습니다.
            </>
        )
        setWorkLocationText(
            <>
                - 청소년은 제조업체, 패스트푸드점, 술을 판매하지 않는 일반 음식점, 편의점, 주유소 등 에서 근무가 가능합니다.
                <br/>
                - 청소년은 유흥주점, 단란주점, 비디오방, 노래방(청소년 출입허용 시설업소는 가능), PC방, 전화방, 숙박업, 이용업, 안마실을 설치한 목욕장업, 만화대여업, 술을 판매하는 소주방, 호프, 카페, 무도장업, 사행행위영업 등에 근무할 수 없습니다.
                <br/>
                - 고압 및 잠수 작업, 유류, 양조업무, 도살, 교도소 등과 같이 청소년보호법상 고용금지 직종이거나 도덕ㆍ보건 측면에서 유해하거나 위험한 일은 할 수 없습니다.
            </>
        )

        // 1단계: 해당 계약서 uuid가 존재하는지 확인
        axios({
            method: 'get',
            url: NEXT_PUBLIC_BACKEND_URL+'/api/contract/verify/uuid',
            headers: {
                contract_uuid: contract_uuid
            },
            withCredentials: true
        })
            .then(r=>{
                setLoadingView(null)
                if (!r.data.result) {
                    setErrorView(
                        <Alert variant="filled" severity="error" style={{margin: '1rem'}}>
                            존재하지 않거나 접근이 불가능한 계약서입니다.
                        </Alert>
                    )
                    return
                }
                setPasswordView(true)
            })
            .catch(e=>{
                alert('서버와 통신 중 오류가 발생하였습니다. 새로고침 후 다시 시도해주세요.')
            })


    }, [router.isReady])
    
    return (
        <>
            <Header />
            {loadingView}
            <div className={styles.title_create}>
                <div className={styles.title_big}>
                    전자근로계약서 확인
                </div>
                <div className={styles.title_small}>
                    작성된 계약서를 확인합니다.
                </div>
            </div>
            {errorView}
            {passwordView?(
                <div className={styles.password_input_container}>
                    <div className={styles.password_input_box}>
                        <div className={styles.input_title}>
                            접속 인증번호 입력
                        </div>
                        <OtpInput
                            onChange={setCode}
                            shouldAutoFocus={true}
                            separator={<span style={{fontFamily:'pretendard'}}>-</span>}
                            numInputs={4}
                            isInputNum={true}
                            isInputSecure={true}
                            inputStyle={styles.input}
                            value={code}
                        />
                        <button
                            className={styles.input_button}
                            onClick={() => {
                                console.log(`code: ${code}`)
                                if (code.length < 4) return alert('잘못된 인증번호 입니다.')
                                setButtonText('처리 중...')
                                setLoadingView(
                                    <div className={styles.loading_container}>
                                        <div className={styles.loading_box_processing}>
                                            <div className={styles.info}>
                                                <CircularProgress style={{width: '1.5rem', height: '1.5rem', marginLeft: '1.5rem', position: 'absolute', marginTop: '1.375rem'}} color='success' />
                                                <div className={styles.title}>
                                                    처리 중...
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                axios({
                                    method: 'post',
                                    withCredentials: true,
                                    data: {
                                        code: code,
                                        contract_uuid: contract_uuid
                                    },
                                    url: NEXT_PUBLIC_BACKEND_URL+'/api/contract/search'
                                })
                                    .then(r=>{
                                        if (!r.data.verify) {
                                            setButtonText('확인')
                                            alert('잘못된 인증번호 입니다.')
                                            setLoadingView(null)
                                            return
                                        }
                                        setPasswordView(false)
                                        setFormData({ ...r.data })
                                        console.log(r.data)
                                        setNowView(true)
                                        setLoadingView(null)
                                    })
                            }}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            ):null}
            {nowView?formView:null}
        </>
    )
}

export default View