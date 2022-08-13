import styles from '../../styles/pages/contract/create/create.module.css'
import Header from "../../components/Header";
import {
    Checkbox, FormControl, FormControlLabel,
    FormGroup, FormLabel,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Alert,
    AlertTitle, Button, CircularProgress
} from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {useEffect, useRef, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {ko} from "date-fns/locale"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useRouter} from "next/router";
import SignatureCanvas from "react-signature-canvas";
import ReplayIcon from '@mui/icons-material/Replay';
import {LoadingButton} from "@mui/lab";
import axios from "axios";

const Create = () => {
    const [endDateText, setEndDateText] = useState()
    const [workWeekText, setWorkWeekText] = useState()
    const [workTimeSelectMenuItem, setWorkTimeSelectMenuItem] = useState([])
    const [workTimeText, setWorkTimeText] = useState()
    const [workLocationText, setWorkLocationText] = useState()
    const [restTimeText, setRestTimeText] = useState()
    const [wageText, setWageText] = useState()
    const router = useRouter()
    const signCanvas = useRef()
    const [sendButton, setSendButton] = useState(false)
    const [formView, setFormView] = useState(false)
    const [loadingView, setLoadingView] = useState(true)
    const [errorView, setErrorView] = useState()
    const [successView, setSuccessView] = useState()

    //INPUT_DATA
    const [formData, setFormData] = useState({
        contract_access_token: '',
        company_name: '',
        ceo_name: '',
        company_number: '',
        contract_start_date: new Date(),
        contract_end_date: new Date(),
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
        sign_data_url: '',
        rest_start_time: '',
        rest_end_time: '',
        document: {
            family: false,
            agreement: false,
        },
        worker_name: '',
        work_rest_day: '',
        worker_uuid: '',
        company_uuid: '',
        ceo_uuid: '',
    })

    useEffect(()=>{
        if(!router.isReady) return
        setEndDateText(
            <>
                - 근로계약기간의 정함이 없는 경우에는 시작일만 입력하세요.
                <br/>
                - 근로계약기간은 1년을 초과할 수 없습니다. 단 일정한 사업의 완료가 예정되어 있어서 사업기간이 정하여져 있는 경우에는 사업완료에 필요한 기간이 비록 1년을 초과하더라도 그 기간동안을 근로계약을 체결할 수 있습니다.
            </>
        )
        setWageText(
            <>
                - 2022년의 최저임금은 9,160원 입니다.
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
        setRestTimeText(
            <>
                - 1일 근로 4시간인 경우 최소 30분 이상, 8시간인 경우 최소 60분 부여해야 합니다.
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
        let timeList = []
        for(let i=0; i<25; i++) {
            let slot = '오전'
            let num = i
            if (i/2 >= 6) slot = '오후'
            if (i/2 > 6) num = i - 12
            if (i/2 != 12) {
                timeList = [...timeList,
                    <MenuItem key={i} className={styles.menuItem} value={`${slot} ${num}:00`}>{`${slot} ${num}:00`}</MenuItem>,
                    <MenuItem key={i+24} className={styles.menuItem} value={`${slot} ${num}:30`}>{`${slot} ${num}:30`}</MenuItem>]
            }
        }
        setWorkTimeSelectMenuItem(timeList)

        axios({
            method: 'get',
            url: NEXT_PUBLIC_BACKEND_URL+'/api/contract/verify',
            headers: {
                contract_token: router.query.token
            },
            withCredentials: true
        })
            .then(r=>{
                if(!r.data.result) {
                    setLoadingView(false)
                    setErrorView(
                        <Alert variant="filled" severity="error" style={{margin: '1rem'}}>
                            정보를 불러오는데 실패하였습니다. 이전 페이지로 돌아가 다시 계약서를 생성해주세요.
                        </Alert>
                    )
                    return
                }
                setErrorView(
                    <>
                        <Alert variant="filled" severity="warning" style={{margin: '1rem'}}>
                            <span style={{fontWeight:'700',textDecoration:'underline'}}>현재 접속주소로 처음 계약서 작성을 시작할 때 기준으로 24시간 동안 다시 들어올 수 있습니다.</span>&nbsp;이전 페이지로 돌아가 새로운 계약서를 생성하시면 현재 계약서 주소와 새로운 계약서 주소 모두 유효하나, <span style={{fontWeight:'700',textDecoration:'underline'}}>근로자가 계약에 최종 동의하지 않는 한 계약은 체결되지 않습니다.</span>&nbsp;
                            작성완료 후 페이지 하단 버튼을 클릭 시 <span style={{fontWeight:'700',textDecoration:'underline'}}>근로자에게 동의 여부를 묻는 주소가 즉시 전달</span>됩니다.
                        </Alert>
                    </>
                )
                setLoadingView(false)
                setFormData({
                    ...formData,
                    ceo_name: r.data.ceo_name,
                    company_name: r.data.store_name,
                    company_number: r.data.phone_number,
                    ceo_uuid: r.data.owner_uuid,
                    worker_uuid: r.data.worker_uuid,
                    company_uuid: r.data.store_uuid,
                    worker_name: r.data.worker_name,
                    contract_access_token: router.query.token,
                })
                setFormView(true)
            })

    }, [router.isReady])

    return (
        <>
            <Header />
            {loadingView?(
                <div className={styles.loading_container}>
                    <div className={styles.loading_box_processing}>
                        <div className={styles.info}>
                            <CircularProgress style={{width: '1.5rem', height: '1.5rem', marginLeft: '1.5rem', position: 'absolute', marginTop: '1.375rem'}} color='success' />
                            <div className={styles.loading_title}>
                                처리 중...
                            </div>
                        </div>
                    </div>
                </div>
            ):(null)}
            <div className={styles.title}>
                <div className={styles.title_big}>
                    전자근로계약서
                </div>
                <div className={styles.title_small}>
                    연소 근로자 계약서를 작성합니다.
                </div>
            </div>
            {errorView}
            {successView}
            {formView ? (
                <div className={styles.input_box}>
                    <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            {/* 회사이름, 사장님 이름 등 가게 정보는 미리 입력됨. */}
                            <TextField
                                required
                                fullWidth
                                label="회사 이름(사업체명)"
                                id="fullWidth"
                                variant="standard"
                                disabled={false}
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                color='success'
                                value={formData.company_name|| ''}
                                onChange={(data)=> setFormData({...formData, company_name: data.target.value})}
                            />
                            <TextField
                                required
                                fullWidth
                                label="사장님 이름(사업주명)"
                                id="fullWidth"
                                variant="standard"
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                color='success'
                                value={formData.ceo_name|| ''}
                                onChange={(data)=> setFormData({...formData, ceo_name: data.target.value})}
                            />
                            <TextField
                                required
                                fullWidth
                                label="회사 대표번호(또는 사장님 번호)"
                                id="fullWidth"
                                variant="standard"
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                color='success'
                                value={formData.company_number|| ''}
                                onChange={(data)=> setFormData({...formData, company_number: data.target.value})}
                            />
                            <MobileDatePicker
                                label="계약 시작일"
                                inputFormat="yyyy년 MM월 dd일"
                                // value={value}
                                // onChange={handleChange}
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                renderInput={(params) => <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                    {...params} />}
                                value={formData.contract_start_date|| new Date()}
                                onChange={(data)=> setFormData({...formData, contract_start_date: data})}
                            />
                            <MobileDatePicker
                                label="계약 종료일"
                                inputFormat="yyyy년 MM월 dd일"
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                renderInput={(params) => <TextField
                                    fullWidth
                                    variant="standard"
                                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                    {...params}
                                    helperText={endDateText}
                                    FormHelperTextProps={{
                                        className: styles.info
                                    }}
                                />}
                                color='success'
                                value={formData.contract_end_date|| new Date()}
                                onChange={(data)=> setFormData({...formData, contract_end_date: data})}
                            />
                            <TextField
                                required
                                fullWidth
                                label="근무장소(위치)"
                                id="fullWidth"
                                variant="standard"
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                color='success'
                                helperText={workLocationText}
                                FormHelperTextProps={{
                                    className: styles.info
                                }}
                                value={formData.work_location|| ''}
                                onChange={(data)=> setFormData({...formData, work_location: data.target.value})}
                            />
                            <TextField
                                required
                                fullWidth
                                label="업무의 내용"
                                id="fullWidth"
                                variant="standard"
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                color='success'
                                value={formData.work_info|| ''}
                                onChange={(data)=> setFormData({...formData, work_info: data.target.value})}
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
                                    endAdornment: <InputAdornment position="end"><div className={styles.info}>시간</div></InputAdornment>
                                }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                color='success'
                                helperText={workWeekText}
                                FormHelperTextProps={{
                                    className: styles.info
                                }}
                                value={formData.work_week_time|| ''}
                                onChange={(data)=> setFormData({...formData, work_week_time: data.target.value})}
                            />
                            <TextField
                                select
                                label="근무형태"
                                required
                                fullWidth
                                className={styles.info}
                                variant="standard"
                                hiddenLabel={false}
                                defaultValue=""
                                color='success'
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                onChange={(data)=> {
                                    setFormData({...formData, work_type: data.target.value});
                                }}
                            >
                                <MenuItem className={styles.menuItem} key={1} value='주 1회'>주 1회</MenuItem>
                                <MenuItem className={styles.menuItem} key={2} value='주 2회'>주 2회</MenuItem>
                                <MenuItem className={styles.menuItem} key={3} value='주 3회'>주 3회</MenuItem>
                                <MenuItem className={styles.menuItem} key={4} value='주 4회'>주 4회</MenuItem>
                                <MenuItem className={styles.menuItem} key={5} value='주 5회'>주 5회</MenuItem>
                                <MenuItem className={styles.menuItem} key={6} value='주 6회'>주 6회</MenuItem>
                                <MenuItem className={styles.menuItem} key={7} value='주 7일'>주 7일(매일) [근로기준법 제63조 적용업종]</MenuItem>
                                <MenuItem className={styles.menuItem} key={8} value='주말근무'>주말근무</MenuItem>
                                <MenuItem className={styles.menuItem} key={9} value='격일근무'>격일근무</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="휴일"
                                required
                                fullWidth
                                className={styles.info}
                                variant="standard"
                                hiddenLabel={false}
                                defaultValue=""
                                color='success'
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                onChange={(data)=> {
                                    setFormData({...formData, work_rest_day: data.target.value});
                                }}
                            >
                                <MenuItem className={styles.menuItem} key={1} value='월'>월</MenuItem>
                                <MenuItem className={styles.menuItem} key={2} value='화'>화</MenuItem>
                                <MenuItem className={styles.menuItem} key={3} value='수'>수</MenuItem>
                                <MenuItem className={styles.menuItem} key={4} value='목'>목</MenuItem>
                                <MenuItem className={styles.menuItem} key={5} value='금'>금</MenuItem>
                                <MenuItem className={styles.menuItem} key={6} value='토'>토</MenuItem>
                                <MenuItem className={styles.menuItem} key={7} value='일'>일</MenuItem>
                                <MenuItem className={styles.menuItem} key={8} value='해당없음(주7일, 매일 근무)'>해당없음(주7일, 매일 근무)</MenuItem>
                                <MenuItem className={styles.menuItem} key={9} value='없음'>없음</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="근무시작시간"
                                required
                                fullWidth
                                className={styles.info}
                                variant="standard"
                                hiddenLabel={false}
                                defaultValue=""
                                color='success'
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                helperText={workTimeText}
                                FormHelperTextProps={{
                                    className: styles.info
                                }}
                                value={formData.work_start_time|| ''}
                                onChange={(data)=> setFormData({...formData, work_start_time: data.target.value})}
                            >
                                { workTimeSelectMenuItem }
                            </TextField>
                            <TextField
                                select
                                label="근무종료시간"
                                required
                                fullWidth
                                className={styles.info}
                                variant="standard"
                                hiddenLabel={false}
                                defaultValue=""
                                color='success'
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                helperText={workTimeText}
                                FormHelperTextProps={{
                                    className: styles.info
                                }}
                                value={formData.work_end_time|| ''}
                                onChange={(data)=> setFormData({...formData, work_end_time: data.target.value})}
                            >
                                { workTimeSelectMenuItem }
                            </TextField>
                            <TextField
                                select
                                label="휴식시작시간"
                                fullWidth
                                className={styles.info}
                                variant="standard"
                                hiddenLabel={false}
                                defaultValue=""
                                color='success'
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                FormHelperTextProps={{
                                    className: styles.info
                                }}
                                value={formData.rest_start_time|| ''}
                                onChange={(data)=> setFormData({...formData, rest_start_time: data.target.value})}
                            >
                                { workTimeSelectMenuItem }
                            </TextField>
                            <TextField
                                select
                                label="휴식종료시간"
                                fullWidth
                                className={styles.info}
                                variant="standard"
                                hiddenLabel={false}
                                defaultValue=""
                                color='success'
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                helperText={restTimeText}
                                FormHelperTextProps={{
                                    className: styles.info
                                }}
                                value={formData.rest_end_time|| ''}
                                onChange={(data)=> setFormData({...formData, rest_end_time: data.target.value})}
                            >
                                { workTimeSelectMenuItem }
                            </TextField>
                            <FormGroup row={true} className={styles.moneyForm}>
                                <TextField
                                    select
                                    label="임금 유형"
                                    required
                                    className={styles.info}
                                    variant="standard"
                                    hiddenLabel={false}
                                    defaultValue=""
                                    color='success'
                                    InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                    style={{width:'30%'}}
                                    value={formData.wage_type|| ''}
                                    onChange={(data)=> setFormData({...formData, wage_type: data.target.value})}
                                >
                                    <MenuItem key={1} value="시급">연봉</MenuItem>
                                    <MenuItem key={2} value="시급">건별</MenuItem>
                                    <MenuItem key={3} value="시급">월급</MenuItem>
                                    <MenuItem key={4} value="월급">주급</MenuItem>
                                    <MenuItem key={5} value="일급">일급</MenuItem>
                                    <MenuItem key={6} value="시급">시급</MenuItem>
                                </TextField>
                                <TextField
                                    variant="standard"
                                    label="임금"
                                    color='success'
                                    InputProps={{
                                        style: { fontFamily: 'pretendard', fontWeight: 500 },
                                        endAdornment: <InputAdornment position="end"><div className={styles.info}>원</div></InputAdornment>
                                    }}
                                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                    style={{width:'70%'}}
                                    value={formData.wage_value|| ''}
                                    onChange={(data)=> setFormData({...formData, wage_value: data.target.value})}
                                    helperText={wageText}
                                    FormHelperTextProps={{
                                        className: styles.info
                                    }}
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
                                    endAdornment: <InputAdornment position="end"><div className={styles.info}>%</div></InputAdornment>
                                }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                color='success'
                                value={formData.bonus_percent|| ''}
                                onChange={(data)=> setFormData({...formData, bonus_percent: data.target.value})}
                            />
                            <FormControl
                                required
                                onChange={(data)=> setFormData({...formData, wage_send_type: data.target.value})}>
                                <FormLabel focused={false} className={styles.menuItem}>임금 지급방법</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel value="근로자에게 직접지급" control={<Radio color="success" />} label={<div className={styles.menuItem}>근로자에게 직접지급</div>} />
                                    <FormControlLabel value="근로자 명의 예금통장에 입금" control={<Radio color="success" />} label={<div className={styles.menuItem}>근로자 명의 예금통장에 입금</div>} />
                                </RadioGroup>
                            </FormControl>
                            <FormControl required>
                                <FormLabel focused={false} className={styles.menuItem}>제출서류</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel
                                        value="가족관계증명서"
                                        control={<Checkbox color="success" />}
                                        label={<div className={styles.menuItem}>가족관계증명서</div>}
                                        onChange={(data)=>{
                                            (formData.document.family) ?
                                                setFormData({...formData, document: { family: false }}) :
                                                setFormData({...formData, document: { family: true }})
                                        }}
                                    />
                                </RadioGroup>
                                <RadioGroup>
                                    <FormControlLabel
                                        value="친권자 또는 후견인의 동의서"
                                        control={<Checkbox color="success" />}
                                        label={<div className={styles.menuItem}>친권자 또는 후견인의 동의서</div>}
                                        onChange={(data)=>{
                                            (formData.document.agreement) ?
                                                setFormData({...formData, document: { agreement: false }}) :
                                                setFormData({...formData, document: { agreement: true }})
                                        }}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormControl required>
                                <FormLabel focused={false} className={styles.menuItem}>사회보험적용여부</FormLabel>
                                <RadioGroup>
                                    <FormControlLabel
                                        value="고용보험"
                                        control={<Checkbox color="success" />}
                                        label={<div className={styles.menuItem}>고용보험</div>}
                                        onChange={(data)=>{
                                            (formData.insurance.goyong) ?
                                                setFormData({...formData, insurance: { goyong: false }}) :
                                                setFormData({...formData, insurance: { goyong: true }})
                                        }}
                                    />
                                    <FormControlLabel
                                        value="산재보험"
                                        control={<Checkbox color="success" />}
                                        label={<div className={styles.menuItem}>산재보험</div>}
                                        onChange={(data)=>{
                                            (formData.insurance.sanjae) ?
                                                setFormData({...formData, insurance: { sanjae: false }}) :
                                                setFormData({...formData, insurance: { sanjae: true }})
                                        }}
                                    />
                                    <FormControlLabel
                                        value="국민연금"
                                        control={<Checkbox color="success" />}
                                        label={<div className={styles.menuItem}>국민연금</div>}
                                        onChange={(data)=>{
                                            (formData.insurance.kookmin) ?
                                                setFormData({...formData, insurance: { kookmin: false }}) :
                                                setFormData({...formData, insurance: { kookmin: true }})
                                        }}
                                    />
                                    <FormControlLabel
                                        value="건강보험"
                                        control={<Checkbox color="success" />}
                                        label={<div className={styles.menuItem}>건강보험</div>}
                                        onChange={(data)=>{
                                            (formData.insurance.gungang) ?
                                                setFormData({...formData, insurance: { gungang: false }}) :
                                                setFormData({...formData, insurance: { gungang: true }})
                                        }}
                                    />
                                    <Alert severity="info" className={styles.menuItem}>
                                        <AlertTitle className={styles.info}>사회보험적용여부 안내</AlertTitle>
                                        근로일수, 근로시간에 관계없이 <span style={{fontWeight: 600}}>1개월 미만으로 근무하는 경우 국민연금과 건강보험은 가입이 제외</span>됩니다.
                                        월 근로시간이 60시간 미만이라도 생업을 목적으로 <span style={{fontWeight: 600}}>3개월 이상 근무한다면, 4대보험 가입 대상</span>이 됩니다. 단, 근로시간에 상관없이 <span style={{fontWeight: 600}}>산재보험은 무조건 가입</span>해야합니다.
                                    </Alert>
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                required
                                variant="standard"
                                label="근로자 이름"
                                color='success'
                                InputProps={{
                                    style: { fontFamily: 'pretendard', fontWeight: 500 }
                                }}
                                value={formData.worker_name|| ''}
                                onChange={(data)=> setFormData({...formData, worker_name: data.target.value})}
                            />
                            <FormControl required>
                                <FormLabel focused={false} style={{textAlign: 'center'}} className={styles.menuItem}>사업주<span style={{color:'rgb(150,150,150)'}}>({formData.ceo_name})</span> 서명</FormLabel>
                                <SignatureCanvas ref={signCanvas} penColor='black' canvasProps={{className: styles.signCanvas}} redrawOnResize clearOnResize={false}/>
                                <Button style={{marginTop: '0.5rem'}} onClick={()=>signCanvas.current.clear()} color='success' className={styles.replayButton} variant="outlined" startIcon={<ReplayIcon />}>
                                    서명 다시하기
                                </Button>
                            </FormControl>
                            <LoadingButton
                                color='success'
                                className={styles.sendButton}
                                variant="outlined"
                                size="large"
                                loading={sendButton}
                                loadingPosition="center"
                                onClick={()=>{
                                    // setSendButton(true)
                                    setFormData({...formData, sign_data_url: signCanvas.current.getTrimmedCanvas().toDataURL('image/png')})
                                    axios({
                                        method: 'post',
                                        url: NEXT_PUBLIC_BACKEND_URL+'/api/contract/save',
                                        data: formData,
                                        withCredentials: true,
                                    })
                                        .then(r=>{
                                            setSendButton(false)
                                            setFormView(false)
                                            setErrorView(null)
                                            setSuccessView(
                                                <Alert variant="filled" color="success" style={{margin: '1rem'}}>
                                                    <AlertTitle>정상적으로 계약서 작성이 완료되었습니다.</AlertTitle>
                                                    계약서 작성 및 저장이 정상적으로 암호화하여 서버에 저장되었음을 알려드립니다 🎉<br/>
                                                    <span style={{fontWeight:'700',textDecoration:'underline'}}>계약서는 근로자에게 즉시 문자로 동의 여부를 확인하는 계약서 확인 링크가 전달</span>되고, <span style={{fontWeight:'700',textDecoration:'underline'}}>고용주에게도 작성한 계약서를 확인할 수 있는 링크를 전달</span>해드립니다.
                                                    <br/>* 계약 체결은 근로자가 계약서 내용에 동의 시 진행됩니다.
                                                    <br/>** 계약 체결 시 문자로 알림이 전송됩니다.
                                                    <br/>*** 현재 주소로는 작성 및 전송이 완료되었기에 다시 접속이 불가능하며, 계약서 확인은 문자를 확인해주세요.
                                                </Alert>
                                            )
                                        })
                                        .catch(e=>{
                                            setSendButton(false)
                                            alert('오류가 발생하였습니다. 다시 시도해보세요.')
                                        })
                                }}
                            >
                                <strong>근로계약서 작성완료 및 전송하기</strong>
                            </LoadingButton>
                        </Stack>
                    </LocalizationProvider>
                </div>
            ) : (null)}
        </>
    )
}

export default Create;