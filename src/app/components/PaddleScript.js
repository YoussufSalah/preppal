<Script
    src="https://cdn.paddle.com/paddle/v2/paddle.js"
    strategy="beforeInteractive"
    onLoad={() => {
        if (typeof window !== "undefined" && window.Paddle) {
            window.Paddle.Environment.set("sandbox");
            window.Paddle.Initialize({
                token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
                eventCallback: function (data) {
                    console.log(data);
                },
            });
        }
    }}
/>;
