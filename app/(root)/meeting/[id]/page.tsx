"use client";
import { useParams } from 'next/navigation';

const Meeting = () => {
    const params = useParams<{ id: string }>();

    return (
        <div>Meeting Room #{params?.id}</div>
    )
}

export default Meeting;