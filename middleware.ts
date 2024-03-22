import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";

import { Database } from "database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // 쿠키를 사용하도록 구성된 Supabase 클라이언트를 생성
  const supabase = createMiddlewareClient<Database>({ req, res });
  //업데이트 쿠키
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return res;
}

// 미들웨어가 관련 경로에 대해서만 호출되도록 설정합니다.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
