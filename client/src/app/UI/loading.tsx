import React, { useState, useEffect } from 'react'

export default function loading() {
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <div>
            Loading....
        </div>
    )
}

