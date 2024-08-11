import React, { useState, useEffect } from 'react'

export default function Loading() {
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <div>
            Loading....
        </div>
    )
}

