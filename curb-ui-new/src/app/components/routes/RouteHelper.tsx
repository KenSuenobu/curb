import {verifyJwt} from '@/app/helpers/jwt';
import {NextResponse} from 'next/server';

/**
 * RouteHelper is a class that assists route code by reading the request and access tokens, parsing authentication
 * data, and providing helpers for common return results.
 */
class RouteHelper {
  private readonly request: any;
  private readonly accessToken: string;

  /**
   * Creates a new helper.
   *
   * @param request The incoming web request.
   */
  constructor(request: any) {
    this.request = request;
    this.accessToken = request.headers.get('Authorization');
  }

  /**
   * Returns a flag indicating if the authorization is valid for the current request.
   *
   * @return true if valid, false otherwise.
   */
  isAuthorized(): boolean {
    return (this.accessToken && this.getJwt());
  }

  /**
   * Returns the decrypted JWT token dictionary.
   */
  getJwt(): any {
    return verifyJwt(this.accessToken);
  }

  /**
   * Retrieves the access token that was set in cookies.
   */
  getAccessToken(): string {
    return this.accessToken;
  }

  /**
   * Parses the URL request for a string by its key, returning the value, if present.
   *
   * @param key The key to retrieve from the request.
   * @return string containing the request, blank if not present.
   */
  getInputVariable(key: string): string {
    return this.request.nextUrl.searchParams.get(key);
  }

  /**
   * Retrieves the post payload from a request.
   */
  async getPostPayload(): Promise<any> {
    return this.request.json();
  }

  /**
   * Returns a 401 Unauthorized response.
   */
  unauthorizedResponse(): NextResponse {
    return NextResponse.json({
      message: 'Unauthorized',
    }, { status: 401 });
  }

  /**
   * Generates a 404 Not Found response indicating a missing field.
   *
   * @param fieldName The name(s) of the missing field, adding "is required" after the message.
   */
  missingFieldResponse(fieldName: string): NextResponse {
    return NextResponse.json({
      message: `${fieldName} is required`,
    }, { status: 404 });
  }

  /**
   * Returns a response with a payload.
   *
   * @param data The payload to return.
   * @param status The status to return, 200 if not set.
   */
  createResponse(data: any, status: number = 200): NextResponse {
    return NextResponse.json(data, { status });
  }

  /**
   * Returns a string message as a response.
   *
   * @param message The message to return.
   * @param status The status to return, 200 if not set.
   */
  createMessageResponse(message: string, status: number = 200): NextResponse {
    return NextResponse.json({ message }, { status });
  }

  /**
   * Creates an error response with a message included, along with a stack trace, if applicable.
   *
   * @param message The message to return.
   * @param result The resulting error data, stack trace, or other info.
   * @param status The status to return, 500 if not set.
   */
  createErrorResponse(message: string, result: any, status: number = 500): NextResponse {
    return NextResponse.json({
      message,
      result,
    }, { status });
  }
}

export default RouteHelper;
