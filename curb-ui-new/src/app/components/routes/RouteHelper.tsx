import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';

class RouteHelper {
  private readonly request: any;
  private readonly accessToken: string;

  constructor(request: any) {
    this.request = request;
    this.accessToken = request.headers.get('Authorization');
  }

  isAuthorized(): boolean {
    return (this.accessToken && this.getJwt());
  }

  getJwt(): any {
    return verifyJwt(this.accessToken);
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getInputVariable(key: string): string {
    return this.request.nextUrl.searchParams.get(key);
  }

  async getPostPayload(): Promise<any> {
    return this.request.json();
  }

  unauthorizedResponse(): NextResponse {
    return NextResponse.json({
      message: 'Unauthorized',
    }, { status: 401 });
  }

  missingFieldResponse(fieldName: string): NextResponse {
    return NextResponse.json({
      message: `${fieldName} is required`,
    }, { status: 404 });
  }

  createResponse(data: any, status: number = 200): NextResponse {
    return NextResponse.json(data, { status });
  }

  createErrorResponse(message: string, result: any, status: number = 500): NextResponse {
    return NextResponse.json({
      message,
      result,
    }, { status });
  }
}

export default RouteHelper;
