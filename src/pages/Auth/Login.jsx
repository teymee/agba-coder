import React from "react";

export default function Login() {

  // https://wakatime.com/oauth/authorize?client_id=xxx&response_type=token&scope=read_logged_time read_summaries read_stats read_goals email read_durations read_heartbeats read_user&redirect_uri=http://localhost:7000/callback/

  const link = `https://wakatime.com/oauth/authorize?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&response_type=token&scope=read_logged_time,read_summaries,read_stats,read_goals,email,read_heartbeats&redirect_uri=${
    import.meta.env.VITE_REDIRECT_URL
  }`;
  return (
    <section className="w-90 mx-auto border rounded-xl py-4">
      <div className="flex flex-col items-center">
        <h2>Sign into your wakatime account</h2>
        {link}
        {/* <Link to={link}> */}
        <a href={link}>
          <button>Sign in</button>
        </a>

        {/* </Link> */}
      </div>
    </section>
  );
}
