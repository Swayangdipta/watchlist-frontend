import React, { useState } from 'react'
import { isAuthenticated } from '../Auth/helper/authApiCalls'
import {AiFillCopy} from 'react-icons/ai'
import {TiTick} from 'react-icons/ti'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ShareProfile = () => {
    const [copied,setCopied] = useState(false)
    const {user} = isAuthenticated()
  return (
    <div className='shareProfile'>
        <p className="shareTitle">Share profile</p>
        <p className="shareLink">
        https://iwatchedit.netlify.app/user/{user._id}
        </p>
        <CopyToClipboard onCopy={() => setCopied(true)} text={`https://iwatchedit.netlify.app/user/${user._id}`}>
            {
                copied ? (<p className='copyLink'>Copied <TiTick /></p>) : (<p className='copyLink'>Copy <AiFillCopy /></p>)
            }            
        </CopyToClipboard>

    </div>
  )
}

export default ShareProfile