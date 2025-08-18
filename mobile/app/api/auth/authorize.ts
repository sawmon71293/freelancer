import { GOOGLE_CLIENT_ID } from "@/constants";

export async function GET(request: Request) {
  if (!GOOGLE_CLIENT_ID) {
    return Response.json(
      { error: "GOOGLE_CLIENT_ID is not set" },
      { status: 500 }
    );
  }
  const url = new URL(request.url);
  let idpClient: string;
  const 
}
