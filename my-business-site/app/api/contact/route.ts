import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const contact = formData.get('contact') as string; // Unified contact field
    const product = formData.get('product') as string;
    const packageName = formData.get('package') as string;
    const message = formData.get('message') as string;

    // [1] Supabase DB에 문의 내역 영구 저장
    const { error: dbError } = await supabase
      .from('inquiries')
      .insert([
        { 
          name, 
          contact, 
          product, 
          package: packageName, 
          message,
          status: '신규 접수' 
        }
      ]);

    if (dbError) {
      console.error('Database Error:', dbError);
      throw new Error('데이터베이스 저장 실패');
    }

    // [2] Nodemailer를 통한 Gmail 직접 발송 로직
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: `"${name} (Blingkkami Web)" <${process.env.GMAIL_USER}>`,
      replyTo: contact, // Using the unified contact field
      to: process.env.GMAIL_USER,
      subject: `[프로젝트 문의] 🎉 ${name}님의 새로운 의뢰 도착!`,
      html: `
        <div style="font-family: 'Malgun Gothic', dotum, sans-serif; padding: 30px; background-color: #f7f9fc; border-radius: 12px; max-w: 600px; margin: 0 auto;">
          <h2 style="color: #6B3FA0; border-bottom: 2px solid #ddd; padding-bottom: 10px;">새로운 문의가 접수되었습니다.</h2>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>👔 이름/기업명:</strong> ${name}</p>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>📞 연락처:</strong> ${contact}</p>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>📦 상품명:</strong> ${product}</p>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>🏷️ 선택 패키지:</strong> ${packageName}</p>
          <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #555; margin-bottom: 10px;"><strong>📝 문의 내용:</strong></p>
            <pre style="white-space: pre-wrap; font-family: inherit; margin: 0; line-height: 1.6;">${message ?? '추가 내용 없음'}</pre>
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
