import { NextRequest, NextResponse } from "next/server";
import { TenancyType } from "./constants/type";
import { PageEnum } from "./constants/enum";

export async function middleware(req: NextRequest) {
  try {
    const tenancyCookies: any = req.cookies.get("tenancy");
    const tenancy: TenancyType = JSON.parse(tenancyCookies?.value)
    if (tenancy && tenancy?.isGDM === false) {
      const {pathname} = req.nextUrl
      if (pathname.includes(PageEnum.Vip) || pathname.includes(PageEnum.Affiliate) || pathname.includes(PageEnum.Downline)) {
        console.log('redirect...');
        return NextResponse.rewrite(new URL("/not-found", req.url));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|lib|login|images|nav-svg).*)'],
}