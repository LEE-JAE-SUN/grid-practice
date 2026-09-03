import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

/* 실습용 표 하나. 이 파일이 "코드가 원하는 DB 구조"다.
   여기에 column을 하나 더한 뒤 db:generate, db:migrate를 실행하면
   실제 DB가 이 모양을 따라온다. */
export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  teamName: text('team_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

/* 회원가입 실습용 표. 비밀번호는 평문으로 저장한다 — 실제 서비스에서는 절대 이렇게
   하지 않고 bcrypt 등으로 해시해서 저장해야 한다. */
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
