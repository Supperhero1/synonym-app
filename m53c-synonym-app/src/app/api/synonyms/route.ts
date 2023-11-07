import synonymMap from "@/data/store";

export async function GET(request: Request) {
    console.log('===request===', request)
    return Response.json({
        test: 123
    })
}
