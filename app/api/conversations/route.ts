import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '../../libs/prisma.db'

export async function POST(request: Request) {
    try {
        
    } catch (error) {
        return new NextResponse('Internal error', {status: 500})
    }
} 