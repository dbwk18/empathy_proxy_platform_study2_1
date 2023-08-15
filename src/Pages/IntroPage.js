import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';

import './page.css';


export const IntroPage = (props) => {

    // get user id from previous page
    const location = useLocation();
    const history = window.history;

    const { id } = location.state;

    // prevent back & refresh button
    useEffect(() => {
        const preventGoBack = () => {
            history.pushState(history.state, null, location.href);
        }
        const preventRefresh = (e) => {
            e.preventDefault();
            e.returnValue = "";
        }

        history.pushState(history.state, null, location.href);
        window.addEventListener('popstate', preventGoBack);

        window.addEventListener("beforeunload", preventRefresh);

        return() => {
            window.removeEventListener('popstate', preventGoBack);
            window.removeEventListener('beforeunload', preventRefresh);
        }

    }, [])

    // set the page number
    const [currentPageNum, setCurrentPageNum] = useState(2);

    function prev () {
        setCurrentPageNum(currentPageNum- 1);
    }

    function next () {
        setCurrentPageNum(currentPageNum + 1);
    }

    return(
        <>
            <Topbar id={id} currentState={1}/>
            <div className='page'>
                <div className='introduction'>
                    {currentPageNum === 2 ?
                        <>
                            <div className='explaination'>
                                Thank you for your interest in participating in our study.
                                The purpose of this study is to gain insights into understanding <b>hate speech</b> related to topics such as feminist movement and legalization of abortion.
                                Your valuable input will contribute to a deeper understanding of these important social issues.
                            </div>
                            <br/>
                            <div className='explaination'>
                                Before we begin, we want to emphasize that you are able to stop participating in our study at any time.
                                If, at any point, you feel uncomfortable or wish to discontinue, please feel free to do so.
                                Your decision to withdraw will not have any negative consequences, and any data collected up to that point will be discarded.
                            </div>
                        </>
                        :
                        (
                            currentPageNum === 3 ?
                            <>
                                <div className='explaination'>
                                    Please note that this survey may contain offensive speech or content, including instances of hate speech.
                                    We understand that this may cause discomfort for some participants. We encourage you to consider this aspect before proceeding.
                                    If at any point you find the content to be distressing, please feel free to discontinue your participation.
                                </div>
                                <br/>
                                <div className='explaination'>
                                    During the study, we will <b>not</b> collect any personal information and all the data collected during the study will be <b>anonymized</b>.
                                    The data collected will be used solely for research purposes. 
                                </div>
                            </>
                            :
                            <>
                                <div className='explaination'>
                                    This study consists of three tasks.
                                    During three tasks, you will be presented with a series of tweets and asked to annotate whether they contain hate speech or not. The topics might differ between tasks.
                                    There will be pre- and post- survey before and after the task.
                                </div>
                                <br/>
                                <div className='explaination'>
                                    During the task, please do <b>not</b> click '<b>back / refresh</b> button' in the browser.
                                    If you want to go back to previous page, use <b>'Prev'</b> button in the bottom of the page.
                                    If you exit the current page, your data will be initialized.
                                    Also, you will not be able to move between tasks, so please confirm your answers before moving to the next task.
                                    <br/>
                                    If you have any questions or concerns about the study, please contact <i>dbwk18@kaist.ac.kr</i>. Thank you for considering participating in our study. 
                                </div>
                                <br/>
                            </>
                        )
                    }

                </div>
                <div className='buttonContainer'>
                    {currentPageNum === 2 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                    {currentPageNum === 4 ? <Link to = '/pre' state={{id: id}} className='nextBtn' >Start</Link> : <button className='nextBtn' onClick={next}>Next</button>}
                </div>
            </div>
        </>
    )
}