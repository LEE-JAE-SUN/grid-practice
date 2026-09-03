'use server'

import { eq } from 'drizzle-orm'
import { getDb } from '@/db'
import { users } from '@/db/schema'

export type SignupState = {
  message: string
  ok: boolean
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: '이메일 형식이 올바르지 않습니다.' }
  }
  if (password.length < 8) {
    return { ok: false, message: '비밀번호는 8자 이상이어야 합니다.' }
  }

  const db = getDb()

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existing.length > 0) {
    return { ok: false, message: '이미 가입된 이메일입니다.' }
  }

  /* 실습용이라 평문 저장. 실제 서비스라면 여기서 bcrypt.hash 등을 거쳐야 한다. */
  await db.insert(users).values({ email, password })

  return { ok: true, message: '가입되었습니다.' }
}
