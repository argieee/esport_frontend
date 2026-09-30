import React, { useState, useEffect } from 'react';
import { CalendarX, ClipboardList } from 'lucide-react';
import { apiFetch } from '../../utils/api';

const Predictions = ({ globalGame, globalTournament }) => {
  const [matches, setMatches] = useState([]);

  const [myPredictions, setMyPredictions] = useState([]);
  const [username, setUsername] = useState('Player1');
  const activeGame = (globalGame || 'VALORANT').toLowerCase();
  const accent = activeGame === 'valorant' ? '#06b6d4' : '#f59e0b';

  useEffect(() => {
    fetchMatches();
    fetchMyPredictions();
  }, [activeGame, username, globalTournament]);

  const fetchMatches = async () => {
    try {
      const res = await apiFetch(`/api/predictions/matches?tournament=${encodeURIComponent(globalTournament || 'Default')}`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  };


  const fetchMyPredictions = async () => {
    try {
      const res = await apiFetch(`/api/predictions/user/${username}`);
      const data = await res.json();
      setMyPredictions(data);
    } catch (err) {
      console.error('Error fetching user predictions:', err);
    }
  };

  const handlePredict = async (matchId, teamId) => {
    try {
      await apiFetch(`/api/predictions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          match_id: matchId,
          predicted_winner_team_id: teamId
        })
      });
      fetchMyPredictions();
    } catch (err) {
      console.error('Error submitting prediction:', err);
    }
  };

  const getPredictionForMatch = (matchId) => {
    return myPredictions.find(p => p.match_id === matchId);
  };

  /* ── inline styles (no external CSS needed) ── */
  const styles = {
    page: {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      scrollbarWidth: 'thin',
      scrollbarColor: '#1e293b transparent',
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      color: '#e2e8f0',
      position: 'relative',
    },
    ambientGlow: {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    },
    glowOrb: {
      position: 'absolute',
      top: '-80px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 700,
      height: 350,
      borderRadius: '50%',
      filter: 'blur(140px)',
      opacity: 0.07,
      backgroundColor: accent,
    },
    inner: {
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: 1400,
      padding: '28px 40px 64px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
    },
    /* header */
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    headerBar: {
      width: 3,
      height: 32,
      borderRadius: 999,
      background: `linear-gradient(180deg, ${accent}, #3b82f6)`,
      boxShadow: `0 0 14px ${accent}60`,
    },
    headerSub: {
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: '#64748b',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 900,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      margin: 0,
      lineHeight: 1.1,
    },
    userPill: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'rgba(30,41,59,0.7)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 999,
      padding: '8px 16px 8px 20px',
      backdropFilter: 'blur(12px)',
    },
    userLabel: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#64748b',
      whiteSpace: 'nowrap',
    },
    userInput: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: 14,
      fontWeight: 800,
      color: '#e2e8f0',
      width: 100,
    },
    /* grid */
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 28,
    },
    /* section label */
    sectionLabel: (color) => ({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      paddingLeft: 4,
      marginBottom: 12,
    }),
    sectionDot: (color) => ({
      width: 4,
      height: 16,
      borderRadius: 999,
      backgroundColor: color,
      boxShadow: `0 0 8px ${color}60`,
    }),
    sectionTitle: {
      fontSize: 13,
      fontWeight: 900,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    },
    /* card wrapper */
    card: {
      background: 'rgba(15,23,42,0.65)',
      backdropFilter: 'blur(16px)',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      overflow: 'hidden',
      transition: 'border-color 0.4s',
    },
    /* match card */
    matchCard: {
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      borderBottom: '1px solid rgba(255,255,255,0.03)',
      position: 'relative',
    },
    matchDate: {
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: '#475569',
    },
    matchBody: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
    },
    teamBtn: (isSelected, isA) => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '16px 12px',
      borderRadius: 12,
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      border: isSelected ? `1.5px solid ${isA ? accent : '#f43f5e'}` : '1.5px solid transparent',
      background: isSelected
        ? (isA ? `${accent}18` : 'rgba(244,63,94,0.09)')
        : 'rgba(15,23,42,0.5)',
      transform: isSelected ? 'scale(1.03)' : 'scale(1)',
      position: 'relative',
      zIndex: isSelected ? 2 : 1,
    }),
    teamAvatar: (isA) => ({
      width: 48,
      height: 48,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 900,
      fontSize: 16,
      letterSpacing: '0.05em',
      background: isA
        ? 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(59,130,246,0.12))'
        : 'linear-gradient(135deg, rgba(244,63,94,0.18), rgba(168,85,247,0.12))',
      color: isA ? accent : '#f43f5e',
      border: `1px solid ${isA ? 'rgba(6,182,212,0.2)' : 'rgba(244,63,94,0.2)'}`,
    }),
    teamName: {
      fontSize: 13,
      fontWeight: 700,
      textAlign: 'center',
      lineHeight: 1.2,
    },
    /* probability center */
    probCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 160,
      padding: '0 8px',
      gap: 6,
      zIndex: 3,
    },
    probNumbers: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      gap: 10,
      width: '100%',
    },
    probA: {
      fontSize: 22,
      fontWeight: 900,
      color: accent,
      letterSpacing: '-0.02em',
    },
    probVs: {
      fontSize: 10,
      fontWeight: 800,
      color: '#475569',
      letterSpacing: '0.1em',
    },
    probB: {
      fontSize: 22,
      fontWeight: 900,
      color: '#f43f5e',
      letterSpacing: '-0.02em',
    },
    /* horizontal probability bar */
    probBarOuter: {
      width: '100%',
      height: 6,
      borderRadius: 999,
      background: 'rgba(30,41,59,0.8)',
      overflow: 'hidden',
      display: 'flex',
      position: 'relative',
    },
    probBarA: (pct) => ({
      width: `${pct}%`,
      height: '100%',
      background: `linear-gradient(90deg, ${accent}, #38bdf8)`,
      borderRadius: '999px 0 0 999px',
      transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
      boxShadow: `0 0 10px ${accent}50`,
    }),
    probBarB: (pct) => ({
      width: `${pct}%`,
      height: '100%',
      background: 'linear-gradient(90deg, #fb7185, #f43f5e)',
      borderRadius: '0 999px 999px 0',
      transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
      boxShadow: '0 0 10px rgba(244,63,94,0.3)',
      marginLeft: 'auto',
    }),
    probLabel: {
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#475569',
    },
    vsPlain: {
      fontSize: 18,
      fontWeight: 900,
      fontStyle: 'italic',
      color: '#334155',
      padding: '0 20px',
      userSelect: 'none',
    },
    /* empty state */
    emptyBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '56px 24px',
      borderRadius: 12,
      border: '1.5px dashed rgba(71,85,105,0.3)',
      background: 'rgba(15,23,42,0.25)',
      textAlign: 'center',
    },
    emptyTitle: {
      fontSize: 14,
      fontWeight: 600,
      color: '#cbd5e1',
      marginBottom: 4,
    },
    emptySub: {
      fontSize: 12,
      color: '#64748b',
    },
    /* table */
    table: {
      width: '100%',
      textAlign: 'left',
      borderCollapse: 'collapse',
      whiteSpace: 'nowrap',
    },
    th: (first, last) => ({
      padding: '14px 24px',
      ...(first && { paddingLeft: 28 }),
      ...(last && { paddingRight: 28, textAlign: 'right' }),
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: '#64748b',
      borderBottom: '1px solid rgba(51,65,85,0.35)',
    }),
    td: (first, last) => ({
      padding: '14px 24px',
      ...(first && { paddingLeft: 28 }),
      ...(last && { paddingRight: 28, textAlign: 'right' }),
      fontSize: 13,
      borderBottom: '1px solid rgba(30,41,59,0.4)',
    }),
    statusBadge: (status) => {
      const won = status?.toLowerCase() === 'won' || status?.toLowerCase() === 'correct';
      const lost = status?.toLowerCase() === 'lost' || status?.toLowerCase() === 'incorrect';
      return {
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'capitalize',
        background: won ? 'rgba(34,197,94,0.12)' : lost ? 'rgba(244,63,94,0.12)' : 'rgba(51,65,85,0.5)',
        color: won ? '#4ade80' : lost ? '#fb7185' : '#94a3b8',
        border: `1px solid ${won ? 'rgba(34,197,94,0.2)' : lost ? 'rgba(244,63,94,0.2)' : 'rgba(71,85,105,0.3)'}`,
      };
    },
    pointsCell: {
      fontWeight: 900,
      color: '#4ade80',
    },
  };


  return (
    <div className="w-full h-full bg-bg-base" style={styles.page}>
      {/* Ambient glow */}
      <div style={styles.ambientGlow}>
        <div style={styles.glowOrb} />
      </div>

      <div style={styles.inner}>
        {/* ── Header ── */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerBar} />
            <div>
              <div style={styles.headerSub}>Community</div>
              <h1 style={styles.headerTitle}>Predictions</h1>
            </div>
          </div>
          <div style={styles.userPill}>
            <span style={styles.userLabel}>Playing as:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.userInput}
              placeholder="Username"
            />
          </div>
        </div>

        {/* ── Main grid ── */}
        <div style={styles.grid}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* ── Upcoming Matches ── */}
            <div>
              <div style={styles.sectionLabel(accent)}>
                <div style={styles.sectionDot(accent)} />
                <h2 style={styles.sectionTitle}>Upcoming Matches</h2>
              </div>

              <div style={styles.card}>
                {matches.length === 0 ? (
                  <div style={{ padding: 24 }}>
                    <div style={styles.emptyBox}>
                      <CalendarX size={44} strokeWidth={1.2} style={{ color: '#334155', marginBottom: 14 }} />
                      <div style={styles.emptyTitle}>No upcoming matches right now.</div>
                      <div style={styles.emptySub}>Check back when the new season drops!</div>
                    </div>
                  </div>
                ) : (
                  matches.map((match, i) => {
                    const prediction = getPredictionForMatch(match.match_id);
                    const pA = match.system_prediction?.probability_a ?? 50;
                    const pB = match.system_prediction?.probability_b ?? 50;
                    const isLast = i === matches.length - 1;
                    return (
                      <div
                        key={match.match_id}
                        style={{
                          ...styles.matchCard,
                          ...(isLast && { borderBottom: 'none' }),
                        }}
                      >
                        {/* Date */}
                        <div style={styles.matchDate}>
                          {new Date(match.match_schedule).toLocaleString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </div>

                        {/* Teams + probability */}
                        <div style={styles.matchBody}>
                          {/* Team A */}
                          <div
                            style={styles.teamBtn(prediction?.predicted_winner_team_id === match.team_a.team_id, true)}
                            onClick={() => handlePredict(match.match_id, match.team_a.team_id)}
                          >
                            <div style={styles.teamAvatar(true)}>
                              {match.team_a.logo_url
                                ? <img src={match.team_a.logo_url} alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                                : match.team_a.team_name.substring(0, 2)}
                            </div>
                            <div style={styles.teamName}>{match.team_a.team_name}</div>
                          </div>

                          {/* Probability center */}
                          {match.system_prediction ? (
                            <div style={styles.probCenter}>
                              <div style={styles.probNumbers}>
                                <span style={styles.probA}>{pA}%</span>
                                <span style={styles.probVs}>VS</span>
                                <span style={styles.probB}>{pB}%</span>
                              </div>
                              {/* Horizontal bar */}
                              <div style={styles.probBarOuter}>
                                <div style={styles.probBarA(pA)} />
                                <div style={styles.probBarB(pB)} />
                              </div>
                              <div style={styles.probLabel}>Win Probability</div>
                            </div>
                          ) : (
                            <div style={styles.vsPlain}>VS</div>
                          )}

                          {/* Team B */}
                          <div
                            style={styles.teamBtn(prediction?.predicted_winner_team_id === match.team_b.team_id, false)}
                            onClick={() => handlePredict(match.match_id, match.team_b.team_id)}
                          >
                            <div style={styles.teamAvatar(false)}>
                              {match.team_b.logo_url
                                ? <img src={match.team_b.logo_url} alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                                : match.team_b.team_name.substring(0, 2)}
                            </div>
                            <div style={styles.teamName}>{match.team_b.team_name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ── My Past Predictions ── */}
            <div>
              <div style={styles.sectionLabel(accent)}>
                <div style={styles.sectionDot(accent)} />
                <h2 style={styles.sectionTitle}>My Past Predictions</h2>
              </div>

              <div style={{ ...styles.card, overflowX: 'auto' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th(true, false)}>Match</th>
                      <th style={styles.th(false, false)}>Predicted Winner</th>
                      <th style={styles.th(false, false)}>Status</th>
                      <th style={styles.th(false, true)}>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPredictions.filter(p => p.status !== 'pending').length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ padding: '48px 24px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ClipboardList size={30} strokeWidth={1.2} style={{ color: '#334155', marginBottom: 12 }} />
                            <div style={styles.emptyTitle}>No predictions on record yet.</div>
                            <div style={styles.emptySub}>Make a call on an upcoming match!</div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      myPredictions.filter(p => p.status !== 'pending').map(p => (
                        <tr key={p.id} style={{ transition: 'background 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ ...styles.td(true, false), color: '#64748b', fontWeight: 600 }}>#{p.match_id}</td>
                          <td style={{ ...styles.td(false, false), fontWeight: 700 }}>Team {p.predicted_winner_team_id}</td>
                          <td style={styles.td(false, false)}>
                            <span style={styles.statusBadge(p.status)}>{p.status}</span>
                          </td>
                          <td style={{ ...styles.td(false, true), ...styles.pointsCell }}>+{p.points_awarded}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictions;

