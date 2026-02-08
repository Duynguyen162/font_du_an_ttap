// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Lấy token từ cookie (giả sử tên token là 'accessToken')
  const token = request.cookies.get("accessToken")?.value;

  // 2. Lấy đường dẫn hiện tại người dùng đang muốn vào
  const { pathname } = request.nextUrl;

  // 3. Danh sách các trang Public (Ai cũng vào được, không cần login)
  const publicPaths = ["/auth/login", "/auth/register", "/auth/restore"];

  // Kiểm tra xem đường dẫn hiện tại có phải là public không
  const isPublicPath = publicPaths.includes(pathname);

  // --- LOGIC BẢO VỆ ---

  // TRƯỜNG HỢP 1: Chưa đăng nhập (Không có token)
  // mà lại cố tình vào trang Private (Dashboard, Patients...)
  if (!token && !isPublicPath) {
    // Đá về trang Login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // TRƯỜNG HỢP 2: Đã đăng nhập rồi (Có token)
  // mà lại cố tình vào trang Login/Register
  if (token && isPublicPath) {
    // Đá về Dashboard (hoặc trang chính của bạn)
    return NextResponse.redirect(new URL("/main/dashboard", request.url));
  }

  // Nếu hợp lệ thì cho đi tiếp
  return NextResponse.next();
}

// Cấu hình Middleware chỉ chạy trên các route cụ thể để tối ưu hiệu năng
export const config = {
  matcher: [
    /*
     * Match tất cả request paths ngoại trừ:
     * 1. /api (API routes)
     * 2. /_next/static (static files)
     * 3. /_next/image (image optimization files)
     * 4. favicon.ico (favicon file)
     * 5. public files (images, svgs...)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
