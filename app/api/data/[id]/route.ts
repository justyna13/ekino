import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id;
	const searchParams = request.nextUrl.searchParams;
	const queryTest = searchParams.get('test');

	return NextResponse.json({
		data: {
			message: 'OK!',
			id,
			query: queryTest,
		},
	});
}

// export async function HEAD(request: NextRequest) {}
//
export async function POST() {
	return NextResponse.json({
		message: 'POST send',
	});
}

// export async function PUT(request: NextRequest) {}
//
// export async function DELETE(request: NextRequest) {}
//
// export async function PATCH(request: NextRequest) {}
//
// export async function OPTIONS(request: NextRequest) {}
