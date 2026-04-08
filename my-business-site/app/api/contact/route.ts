import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const newInquiry = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      message,
      status: "신규 접수",
      date: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) 
    };

    // [1] 관리자 대시보드 저장용 로컬 JSON 기록
    const dbPath = path.join(process.cwd(), 'inquiries.json');
    let inquiries = [];
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, 'utf8');
      inquiries = JSON.parse(fileData);
    }
    inquiries.unshift(newInquiry); 
    fs.writeFileSync(dbPath, JSON.stringify(inquiries, null, 2), 'utf8');

    // [2] Nodemailer를 통한 Gmail 직접 발송 로직!
    // ⚠️ 환경변수 파일(.env.local)의 값을 안전하게 불러와서 세팅합니다.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,         // .env.local 의 GMAIL_USER
        pass: process.env.GMAIL_APP_PASSWORD  // .env.local 의 GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"${name} (Blingkkami Web)" <${process.env.GMAIL_USER}>`, // 발송자 표기
      replyTo: email, // 고객 이메일 주소를 답장 주소로 지정
      to: process.env.GMAIL_USER, // 실제로 알림을 받을 본인 메일
      subject: `[프로젝트 문의] 🎉 ${name}님의 새로운 의뢰 도착!`,
      html: `
        <div style="font-family: 'Malgun Gothic', dotum, sans-serif; padding: 30px; background-color: #f7f9fc; border-radius: 12px; max-w: 600px; margin: 0 auto;">
          <h2 style="color: #6B3FA0; border-bottom: 2px solid #ddd; padding-bottom: 10px;">새로운 문의가 접수되었습니다.</h2>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>👔 이름/기업명:</strong> ${name}</p>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>📞 휴대폰:</strong> ${phone}</p>
          <p style="font-size: 15px; margin-bottom: 20px;"><strong>✉️ 이메일:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">
            <p style="margin: 0; font-size: 14px; color: #555; margin-bottom: 10px;"><strong>📝 문의 내용:</strong></p>
            <pre style="white-space: pre-wrap; font-family: inherit; margin: 0; line-height: 1.6;">${message}</pre>
          </div>
        </div>
      `
    };

    // 혹시라도 앱 비밀번호를 안 넣어서 메일 전송이 에러가 나도, 
    // 사이트(로컬 DB)에는 저장되고 Thank you 화면으로 넘어가게 try-catch 적용
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Gmail 메일 전송 성공!");
    } catch (e) {
      console.log("❌ 메일 발송 에러ㅠㅠ (앱 비밀번호 설정을 확인하세요!):", e);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("API 통합 에러:", error);
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  }
}
