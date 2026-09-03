'use client'

import { useActionState } from 'react'
import { signup, type SignupState } from './actions'

const initialState: SignupState = { ok: false, message: '' }

export default function Signup() {
  const [state, formAction, pending] = useActionState(signup, initialState)

  return (
    <main className="wrap">
      <h1>회원가입</h1>
      <p className="lead">
        이메일과 비밀번호를 받아 <code>users</code> 표에 저장하는 실습입니다. 로그인/세션은
        만들지 않고 가입까지만 처리합니다.
      </p>

      {state.ok ? (
        <div className="card ok">
          <h3>가입되었습니다</h3>
          <p style={{ marginBottom: 0 }}>{state.message}</p>
        </div>
      ) : (
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '.8rem', maxWidth: '20rem' }}>
          <label>
            이메일
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <label>
            비밀번호
            <input type="password" name="password" required minLength={8} autoComplete="new-password" />
          </label>
          <button type="submit" disabled={pending}>
            {pending ? '가입 중...' : '가입하기'}
          </button>
          {state.message ? <p style={{ color: 'var(--danger)' }}>{state.message}</p> : null}
        </form>
      )}

      <div className="card warn" style={{ marginTop: '1.4rem' }}>
        <p style={{ marginBottom: 0 }}>
          이 실습에서는 비밀번호를 <b>평문 그대로</b> 저장합니다. 실제 서비스라면 반드시
          bcrypt 같은 해시 함수를 거쳐야 합니다.
        </p>
      </div>
    </main>
  )
}
