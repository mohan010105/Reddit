-- Kaggle Reddit Memes Dataset Seed
-- Generated on: 2026-05-13T17:24:10.052Z

-- 1. Create Users
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1001, 'kaggle-1001', 'DrarenThiralas', 'drarenthiralas@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ysmkj', 1432, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1002, 'kaggle-1002', 'CasualDad8675309', 'casualdad8675309@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=c96un9', 2491, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1003, 'kaggle-1003', 'NikiTosThePleb', 'nikitosthepleb@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=geemqo', 4182, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1004, 'kaggle-1004', 'bananahands0666', 'bananahands0666@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=s8qru8', 2425, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1005, 'kaggle-1005', 'DJ_MilkBags', 'dj_milkbags@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=8rxje6', 4579, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1006, 'kaggle-1006', 'PsychoCow1', 'psychocow1@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5raup', 4198, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1007, 'kaggle-1007', '_Tebro', '_tebro@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=y9iec7', 1052, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1008, 'kaggle-1008', 'StrikerBoy467', 'strikerboy467@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hpbmdp', 552, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1009, 'kaggle-1009', 'PamperedPooch', 'pamperedpooch@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yvyp5d', 2630, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1010, 'kaggle-1010', 'American_Raider', 'american_raider@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l88fj', 1935, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1011, 'kaggle-1011', 'Conceptionize2', 'conceptionize2@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fl203e', 3942, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1012, 'kaggle-1012', 'MR_BLUFFS', 'mr_bluffs@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=h1rat', 2892, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1013, 'kaggle-1013', 'AssassinAgent', 'assassinagent@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mkr2d8', 3421, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1014, 'kaggle-1014', 'heffers0nn', 'heffers0nn@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=x0ujo5', 4016, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1015, 'kaggle-1015', 'DothrakiBloodrider', 'dothrakibloodrider@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=05kva', 1890, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1016, 'kaggle-1016', 'Um-Tom', 'um-tom@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gor4bl', 1089, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1017, 'kaggle-1017', 'Zeustah-', 'zeustah-@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=j8h9s9', 4759, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1018, 'kaggle-1018', 'mtimetraveller', 'mtimetraveller@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1wfyl', 1480, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1019, 'kaggle-1019', 'Username2Taken', 'username2taken@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=e02fej', 368, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1020, 'kaggle-1020', 'YouGottaKillYourMind', 'yougottakillyourmind@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=k79y1g', 3286, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1021, 'kaggle-1021', 'FXRGRXD', 'fxrgrxd@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=tw1kxb', 3650, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1022, 'kaggle-1022', 'leslieizcute', 'leslieizcute@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=8nlpso', 3906, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1023, 'kaggle-1023', 'JackColor', 'jackcolor@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=7aknou', 2767, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1024, 'kaggle-1024', 'SupremeAppleBaker', 'supremeapplebaker@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=uw3rz', 222, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1025, 'kaggle-1025', 'HitlerDabsOnJews', 'hitlerdabsonjews@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gw5d9o', 3164, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1026, 'kaggle-1026', 'hakiku', 'hakiku@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zbp3rf', 783, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1027, 'kaggle-1027', 'filthydank_2099', 'filthydank_2099@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vefpc3', 2942, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1028, 'kaggle-1028', 'MrPineAppleMan', 'mrpineappleman@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=uk1at', 1569, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1029, 'kaggle-1029', 'ImCewl13', 'imcewl13@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=j880l2', 3900, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1030, 'kaggle-1030', 'YoUsEfIsSqUeAkY', 'yousefissqueaky@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=31ihp', 272, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1031, 'kaggle-1031', 'ukima9', 'ukima9@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=tiywln', 3302, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1032, 'kaggle-1032', 'MatanRak', 'matanrak@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=f9x0k', 549, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1033, 'kaggle-1033', 'Guard1anMeme', 'guard1anmeme@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=4jcbnj', 1383, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1034, 'kaggle-1034', 'Jacobythepotato', 'jacobythepotato@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=qalint', 2845, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1035, 'kaggle-1035', 'Andkan1', 'andkan1@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vcyxlj', 4324, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1036, 'kaggle-1036', 'RascalLouise', 'rascallouise@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cfoxqd', 1912, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1037, 'kaggle-1037', 'Syphlor', 'syphlor@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=478arf', 4962, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1038, 'kaggle-1038', 'Bongnazi', 'bongnazi@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=p8r6zp', 654, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1039, 'kaggle-1039', 'Tree221', 'tree221@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ynl4f6', 3859, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1040, 'kaggle-1040', 'Morningpumpkin', 'morningpumpkin@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=m3d5u6', 1033, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1041, 'kaggle-1041', 'Bepisrory', 'bepisrory@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=8xkuopi', 895, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1042, 'kaggle-1042', 'Combonessex', 'combonessex@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=or6o7m', 3881, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1043, 'kaggle-1043', 'Yoyokevin23', 'yoyokevin23@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rzryy8', 3452, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1044, 'kaggle-1044', 'gabeenglert', 'gabeenglert@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bd00bx', 477, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1045, 'kaggle-1045', 'nakul707', 'nakul707@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mfqsz', 931, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1046, 'kaggle-1046', 'Stormodin', 'stormodin@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cxvhk', 930, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1047, 'kaggle-1047', 'MasterBet', 'masterbet@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ejtsnu', 678, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1048, 'kaggle-1048', 'McJock', 'mcjock@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wgsm86', 2791, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1049, 'kaggle-1049', 'AydanOfHouseCock', 'aydanofhousecock@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mgp2km', 1313, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1050, 'kaggle-1050', 'Hydroplane2010', 'hydroplane2010@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cc4mm', 4547, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1051, 'kaggle-1051', 'FuzzyDickle', 'fuzzydickle@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=16gq9p', 1045, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1052, 'kaggle-1052', 'chudthirtyseven', 'chudthirtyseven@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=2x00u', 4831, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1053, 'kaggle-1053', 'esean_keni', 'esean_keni@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0hesw', 4383, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1054, 'kaggle-1054', 'dopemolder', 'dopemolder@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ryzht6', 732, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1055, 'kaggle-1055', 'NLBLUE', 'nlblue@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5j23m', 3763, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1056, 'kaggle-1056', 'felixmarten_eats_ass', 'felixmarten_eats_ass@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=u1xtu', 1041, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1057, 'kaggle-1057', 'World_War_Meme999', 'world_war_meme999@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=eeej2j', 2231, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1058, 'kaggle-1058', 'zelc23', 'zelc23@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=98a0zt', 293, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1059, 'kaggle-1059', 'Gregas_', 'gregas_@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yfxyr7', 2787, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1060, 'kaggle-1060', 'TruthOfAllTruths', 'truthofalltruths@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=f7rrpd', 3560, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1061, 'kaggle-1061', '_chair_', '_chair_@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=obzubr', 666, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1062, 'kaggle-1062', 'YouGiveDovesABadName', 'yougivedovesabadname@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=satg6', 1231, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1063, 'kaggle-1063', 'edamane12345', 'edamane12345@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=s1t2j', 4333, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1064, 'kaggle-1064', 'yourSAS', 'yoursas@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ke6ym', 246, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1065, 'kaggle-1065', 'X3nagos', 'x3nagos@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=e1inul', 3934, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1066, 'kaggle-1066', 'Drosera19', 'drosera19@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=eiy8az', 1387, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1067, 'kaggle-1067', 'wazowski_kachowski', 'wazowski_kachowski@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=n6muzo', 3169, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1068, 'kaggle-1068', 'Positronium2', 'positronium2@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ggy8ee', 4542, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1069, 'kaggle-1069', 'pokexchespin', 'pokexchespin@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ucpdmg', 3688, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1070, 'kaggle-1070', 'jjm295', 'jjm295@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rgxsx', 3779, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1071, 'kaggle-1071', 'LaserSloth', 'lasersloth@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hv9dra', 1752, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1072, 'kaggle-1072', 'ThePeanutPerson', 'thepeanutperson@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=uxnnfe', 2624, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1073, 'kaggle-1073', 'thelordchanka27', 'thelordchanka27@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ytxzf', 571, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1074, 'kaggle-1074', 'KungFuDabu', 'kungfudabu@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=xde9tn', 2376, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1075, 'kaggle-1075', 'LieutenantEureka', 'lieutenanteureka@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=a8iym', 601, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1076, 'kaggle-1076', 'Garafond', 'garafond@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ucmwtd', 2125, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1077, 'kaggle-1077', 'GG-HappySouls', 'gg-happysouls@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=iy27x9', 3847, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1078, 'kaggle-1078', 'Addy2411', 'addy2411@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gb37nk', 1200, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1079, 'kaggle-1079', 'rybeewoods', 'rybeewoods@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=huhkme', 2201, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1080, 'kaggle-1080', 'marijus001', 'marijus001@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wk2anf', 171, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1081, 'kaggle-1081', 'Kisly_', 'kisly_@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=flfb99', 2160, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1082, 'kaggle-1082', 'Pajamaman24', 'pajamaman24@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=q4pgvk', 2939, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1083, 'kaggle-1083', 'Svdhsvdh', 'svdhsvdh@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hz2pvo', 4159, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1084, 'kaggle-1084', 'puffmonkey92', 'puffmonkey92@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=my9j78', 841, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1085, 'kaggle-1085', 'DisconnectedEDM', 'disconnectededm@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=pfl7z', 737, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1086, 'kaggle-1086', 'TheDraconianViking', 'thedraconianviking@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lichwt', 1028, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1087, 'kaggle-1087', 'Bobart_', 'bobart_@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=7zhxf', 2655, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1088, 'kaggle-1088', 'h8ed-program', 'h8ed-program@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=xrn92q', 1798, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1089, 'kaggle-1089', 'arg6531', 'arg6531@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wy0moj', 1866, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1090, 'kaggle-1090', '_Vice_roy_', '_vice_roy_@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=svuc6s', 4374, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1091, 'kaggle-1091', '420inFinland', '420infinland@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=92581a', 1174, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1092, 'kaggle-1092', 'crazyperson15', 'crazyperson15@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hu8zg', 3253, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1093, 'kaggle-1093', 'Octar', 'octar@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=66zrr', 2214, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1094, 'kaggle-1094', 'ToTheRescues', 'totherescues@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vyb9g4', 2424, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1095, 'kaggle-1095', 'notabot_27', 'notabot_27@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jhk6ko', 1661, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1096, 'kaggle-1096', 'noreaster20', 'noreaster20@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=et0uq7', 4634, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1097, 'kaggle-1097', 'frenzy3', 'frenzy3@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=i4ket1', 2678, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1098, 'kaggle-1098', 'VerkrachtMeisje', 'verkrachtmeisje@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1zp5o6', 3254, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1099, 'kaggle-1099', 'staticjacket', 'staticjacket@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1yxmh9', 3332, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1100, 'kaggle-1100', 'Noctice_', 'noctice_@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=m444vlr', 4370, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1101, 'kaggle-1101', 'yaboynatan', 'yaboynatan@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=4rley8', 935, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1102, 'kaggle-1102', '99999fives', '99999fives@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=13fbo', 2479, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1103, 'kaggle-1103', 'AlexGoman15', 'alexgoman15@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ioig38', 2036, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1104, 'kaggle-1104', 'JuustoRotta', 'juustorotta@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=iss0hr', 1874, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1105, 'kaggle-1105', 'cheezbass', 'cheezbass@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jh84kb', 1167, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1106, 'kaggle-1106', 'Needs-More-Nuking', 'needs-more-nuking@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bwbmc', 1120, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1107, 'kaggle-1107', 'SymphonyInPeril', 'symphonyinperil@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=qz60fg', 2105, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1108, 'kaggle-1108', 'Wulfharth_', 'wulfharth_@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fy9w8s', 1919, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1109, 'kaggle-1109', 'Unwanted_Commentary', 'unwanted_commentary@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=47gkl', 924, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1110, 'kaggle-1110', 'imdcrazy1', 'imdcrazy1@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ptleym', 4640, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1111, 'kaggle-1111', 'VinsanityJr', 'vinsanityjr@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=f78y3i', 2592, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1112, 'kaggle-1112', 'Its_Just_Corbin', 'its_just_corbin@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=u206gm', 3480, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1113, 'kaggle-1113', 'LongBoyeBaguette', 'longboyebaguette@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=g4w682', 2311, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1114, 'kaggle-1114', 'chris175', 'chris175@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=r2lvut', 727, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1115, 'kaggle-1115', 'RodYT', 'rodyt@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=z35qvl', 1162, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1116, 'kaggle-1116', '_Freedom2020', '_freedom2020@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=g4x2r', 1636, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1117, 'kaggle-1117', 'itsamealuigia', 'itsamealuigia@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zwxibh', 1067, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1118, 'kaggle-1118', 'uozeez', 'uozeez@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=grrzms', 4882, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1119, 'kaggle-1119', 'SwizardLizard', 'swizardlizard@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=73h2ch', 3578, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1120, 'kaggle-1120', 'peskett', 'peskett@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3etdjh', 3944, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1121, 'kaggle-1121', 'rommerdebom', 'rommerdebom@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vr0it3', 4888, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1122, 'kaggle-1122', 'Johhnzzy', 'johhnzzy@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hkdtub', 3909, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1123, 'kaggle-1123', 'yumadbro6', 'yumadbro6@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=9ddvq4h', 2447, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1124, 'kaggle-1124', 'LetsGetLitPlease', 'letsgetlitplease@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vf36oa', 4059, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1125, 'kaggle-1125', 'notShadyck', 'notshadyck@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=7cbwxx', 3430, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1126, 'kaggle-1126', 'Kabocca', 'kabocca@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5dsgr', 3990, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1127, 'kaggle-1127', '-___-___-__-___-___-', '-___-___-__-___-___-@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6eqrn', 1279, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1128, 'kaggle-1128', 'yeabouai', 'yeabouai@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dp3b4p', 1346, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1129, 'kaggle-1129', 'skipperhi', 'skipperhi@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mz9jfs', 3841, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1130, 'kaggle-1130', 'How2MakeGrilldCheese', 'how2makegrilldcheese@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=qvhsr', 2003, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1131, 'kaggle-1131', 'paralyyzed', 'paralyyzed@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rizj4', 4056, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1132, 'kaggle-1132', 'ogiELman', 'ogielman@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kvlwm8', 1517, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1133, 'kaggle-1133', 'SinisterPandaML', 'sinisterpandaml@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hgvfvq', 962, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1134, 'kaggle-1134', 'th-rx', 'th-rx@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=uib2rb', 2786, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1135, 'kaggle-1135', 'DatBoiKarlsson', 'datboikarlsson@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yw849r', 4713, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1136, 'kaggle-1136', 'Scruffmygruff', 'scruffmygruff@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ea7sms', 3881, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1137, 'kaggle-1137', 'elfrendo', 'elfrendo@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lacqz', 1158, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1138, 'kaggle-1138', 'Propcreature20', 'propcreature20@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6r9wkj', 3333, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1139, 'kaggle-1139', 'moomyiscoomy', 'moomyiscoomy@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mtxf2o', 2542, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1140, 'kaggle-1140', 'blackshadowjet', 'blackshadowjet@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=c14tv8', 3759, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1141, 'kaggle-1141', 'Greeny11943', 'greeny11943@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=qxse4o', 2538, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1142, 'kaggle-1142', 'owlupus1', 'owlupus1@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0295cb', 4799, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1143, 'kaggle-1143', 'Ketameme69', 'ketameme69@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wdyzdc', 3340, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1144, 'kaggle-1144', 'killahherb', 'killahherb@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rzc4hg', 2314, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1145, 'kaggle-1145', 'Peraltinguer', 'peraltinguer@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bf0m6g', 345, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1146, 'kaggle-1146', 'Krishnhm1', 'krishnhm1@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sxb96c', 3793, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1147, 'kaggle-1147', 'ultimate_memelord', 'ultimate_memelord@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=x5jxys', 4993, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1148, 'kaggle-1148', 'StupidDizzyMedicine', 'stupiddizzymedicine@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=xzi27c', 3869, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1149, 'kaggle-1149', 'SmartBoiiii', 'smartboiiii@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=qha8vg', 469, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1150, 'kaggle-1150', 'Aopap', 'aopap@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=nu871', 3730, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1151, 'kaggle-1151', 'robrightnowio', 'robrightnowio@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kagztc', 762, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1152, 'kaggle-1152', 'ulkick', 'ulkick@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=nylwud', 4929, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1153, 'kaggle-1153', 'LukeBron', 'lukebron@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rrv8q', 1918, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1154, 'kaggle-1154', 'MemNiBBa69', 'memnibba69@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dlettb', 116, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1155, 'kaggle-1155', 'ThunderousBlade', 'thunderousblade@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kiz83', 1795, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1156, 'kaggle-1156', 'OMGSPACERUSSIA', 'omgspacerussia@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1bwohx', 2648, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1157, 'kaggle-1157', 'LordTrollsworth', 'lordtrollsworth@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1cmx7', 1092, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1158, 'kaggle-1158', 'Stimlife', 'stimlife@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zda5q', 2996, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1159, 'kaggle-1159', 'charrok', 'charrok@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6jm5h7', 2512, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1160, 'kaggle-1160', 'UniqueUsername3171', 'uniqueusername3171@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5kbyr', 381, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1161, 'kaggle-1161', 'Pootistheyoungward', 'pootistheyoungward@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=p0ku3', 476, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1162, 'kaggle-1162', 'PittsburghMemed', 'pittsburghmemed@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zspn7r', 4783, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1163, 'kaggle-1163', 'QuestionLolly', 'questionlolly@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mz81hq', 648, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1164, 'kaggle-1164', 'JannsCo', 'jannsco@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fv12mq', 2610, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1165, 'kaggle-1165', 'WreckTangle420', 'wrecktangle420@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5drghi', 3550, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1166, 'kaggle-1166', 'Theboss12312', 'theboss12312@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=tzbmol', 1180, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1167, 'kaggle-1167', 'ComradePoolio', 'comradepoolio@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ezt6y', 410, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1168, 'kaggle-1168', 'PirateMonkeyKing', 'piratemonkeyking@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dp70g8', 1298, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1169, 'kaggle-1169', 'Quak-Quak', 'quak-quak@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=4jxo6b', 1790, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1170, 'kaggle-1170', 'Scribrr', 'scribrr@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gcghof7', 1502, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1171, 'kaggle-1171', 'raisonhell', 'raisonhell@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wit9qp', 3278, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1172, 'kaggle-1172', 'avagantamo', 'avagantamo@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=23f3w', 1250, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1173, 'kaggle-1173', 'thelatinking215', 'thelatinking215@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rpte5m', 4431, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1174, 'kaggle-1174', 'Petaaa', 'petaaa@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ztj3pg', 1580, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1175, 'kaggle-1175', '_Mr_M_', '_mr_m_@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=nm1ha6', 815, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1176, 'kaggle-1176', 'Glu_Ert', 'glu_ert@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=xuj5sw', 4933, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1177, 'kaggle-1177', 'Finny9753', 'finny9753@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dk6f26', 2817, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1178, 'kaggle-1178', 'snapppyb', 'snapppyb@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=77le2p', 1817, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1179, 'kaggle-1179', 'Acox_mu', 'acox_mu@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bxfa3r', 3118, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1180, 'kaggle-1180', 'JesusIsBrown', 'jesusisbrown@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ycv6xj', 3250, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1181, 'kaggle-1181', 'DinoPuns', 'dinopuns@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=xbmui1', 1824, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1182, 'kaggle-1182', 'katakanbr', 'katakanbr@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=x0o', 4315, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1183, 'kaggle-1183', 'Swagamemnon0803', 'swagamemnon0803@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=570pq', 4626, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1184, 'kaggle-1184', 'ThreadlessJon', 'threadlessjon@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1l98nr', 2938, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1185, 'kaggle-1185', 'Buzzwreck', 'buzzwreck@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ht8pgl', 3594, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1186, 'kaggle-1186', 'CthulhuMadness', 'cthulhumadness@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=myaasi', 1698, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1187, 'kaggle-1187', 'pauliedankmeme', 'pauliedankmeme@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bciz8s', 4807, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1188, 'kaggle-1188', 'tsunam11', 'tsunam11@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=60t0a2', 4859, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1189, 'kaggle-1189', 'GeneralDarian', 'generaldarian@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=euiki1', 3525, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1190, 'kaggle-1190', 'plasticalien', 'plasticalien@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=2kcdn', 1030, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1191, 'kaggle-1191', 'FEDORA_YOUTH', 'fedora_youth@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0dgy4d', 3596, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1192, 'kaggle-1192', 'flyistnihilist', 'flyistnihilist@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fgpb1', 193, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1193, 'kaggle-1193', 'd0kTOR', 'd0ktor@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6myav', 4410, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1194, 'kaggle-1194', 'Elitist-Monster', 'elitist-monster@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=g18lke', 837, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1195, 'kaggle-1195', 'MayorOfAus', 'mayorofaus@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1bzhql', 505, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1196, 'kaggle-1196', 'antithesisofnormies', 'antithesisofnormies@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lcrdsg', 3066, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1197, 'kaggle-1197', 'guywithnolefthand', 'guywithnolefthand@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fciucj', 2730, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1198, 'kaggle-1198', 'bunnyclam', 'bunnyclam@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6maf6i', 637, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1199, 'kaggle-1199', 'Jaredrap', 'jaredrap@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=k90sbq', 2155, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1200, 'kaggle-1200', 'siouxsie_siouxv2', 'siouxsie_siouxv2@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l588qo', 2570, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1201, 'kaggle-1201', 'Derpston_P_Derp', 'derpston_p_derp@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yagxxa', 1428, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1202, 'kaggle-1202', 'alah123', 'alah123@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=m25c3', 4335, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1203, 'kaggle-1203', 'EMGZ', 'emgz@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6ri3ld', 1317, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1204, 'kaggle-1204', 'woatsaregoat', 'woatsaregoat@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wycapb', 935, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1205, 'kaggle-1205', '_SpaceMonkey_', '_spacemonkey_@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rq8ekk', 1623, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1206, 'kaggle-1206', 'WoxieNerdNu', 'woxienerdnu@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ch1j6', 2803, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1207, 'kaggle-1207', 'Ishouldquitmycult', 'ishouldquitmycult@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=8pipjr', 4054, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1208, 'kaggle-1208', 'macebot64', 'macebot64@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zvhz8', 452, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1209, 'kaggle-1209', 'MemeusTheDank', 'memeusthedank@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=7242ic', 2206, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1210, 'kaggle-1210', 'PhessPhi', 'phessphi@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0gmsc', 576, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1211, 'kaggle-1211', 'Mambatony', 'mambatony@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=oeeg8g', 1952, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1212, 'kaggle-1212', 'jtmingus1', 'jtmingus1@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=396zk', 701, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1213, 'kaggle-1213', 'Hadestempo1', 'hadestempo1@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0zq5y', 692, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1214, 'kaggle-1214', 'imperialfishFTW', 'imperialfishftw@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kvs5j7', 4357, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1215, 'kaggle-1215', 'kapuskapse', 'kapuskapse@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0jj4mq', 4136, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1216, 'kaggle-1216', 'whatsthatbutt', 'whatsthatbutt@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=j56khv', 1444, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1217, 'kaggle-1217', 'iGalaxy_', 'igalaxy_@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=spmo78', 2323, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1218, 'kaggle-1218', 'BadW0lf-52', 'badw0lf-52@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hztsis', 4139, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1219, 'kaggle-1219', 'idk_hitler_wrong', 'idk_hitler_wrong@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5mbbf', 1389, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1220, 'kaggle-1220', 'Gregor0410', 'gregor0410@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3kiul', 3157, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1221, 'kaggle-1221', 'sarutobi_sensei', 'sarutobi_sensei@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fxyjnp', 3338, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1222, 'kaggle-1222', 'syndixx', 'syndixx@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3cdrg', 928, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1223, 'kaggle-1223', 'onesugar', 'onesugar@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lokfkh', 2821, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1224, 'kaggle-1224', 'Jkoos', 'jkoos@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yrapxt', 4830, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1225, 'kaggle-1225', 'SeattleLibertarian', 'seattlelibertarian@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=y8qpyg', 3992, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1226, 'kaggle-1226', 'Xenocrosser', 'xenocrosser@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=8y2fqx', 4220, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1227, 'kaggle-1227', 'XenoAlvis', 'xenoalvis@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bn15xu', 3551, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1228, 'kaggle-1228', 'King_of_Connaught', 'king_of_connaught@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gs14w', 950, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1229, 'kaggle-1229', 'Mathbound314', 'mathbound314@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=57b1q6', 480, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1230, 'kaggle-1230', 'grimreefer42O', 'grimreefer42o@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cybb0o', 710, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1231, 'kaggle-1231', 'lets_get_hyyerr', 'lets_get_hyyerr@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=o49jr', 4449, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1232, 'kaggle-1232', 'orkavaneger', 'orkavaneger@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ncadn', 1092, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1233, 'kaggle-1233', 'joshrab', 'joshrab@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=192vl', 162, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1234, 'kaggle-1234', 'The_DankMiester', 'the_dankmiester@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l1qiep', 572, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1235, 'kaggle-1235', 'joshc622', 'joshc622@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ptmweu', 260, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1236, 'kaggle-1236', 'mysticpears', 'mysticpears@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ag8cv', 4692, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1237, 'kaggle-1237', 'FlameCrackFire', 'flamecrackfire@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fbsev7', 3790, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1238, 'kaggle-1238', 'WhitakerRepublic', 'whitakerrepublic@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wgs2ij', 3819, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1239, 'kaggle-1239', 'just_fuck_my_shit_up', 'just_fuck_my_shit_up@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=9r38sv', 4538, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1240, 'kaggle-1240', 'TheBostonBruins', 'thebostonbruins@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=tcwfd7', 4266, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1241, 'kaggle-1241', 'CrilleMega', 'crillemega@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=tqktor', 2914, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1242, 'kaggle-1242', 'Whysong823', 'whysong823@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vyxk2', 4503, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1243, 'kaggle-1243', '_NITRISS_', '_nitriss_@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jwaidk', 2754, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1244, 'kaggle-1244', 'Cyphrum', 'cyphrum@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3dbmwq', 1334, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1245, 'kaggle-1245', 'codysgameworld', 'codysgameworld@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=9tp64e', 4256, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1246, 'kaggle-1246', 'AnnaWalter', 'annawalter@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fug1m', 1990, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1247, 'kaggle-1247', 'throatfrog', 'throatfrog@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5c930r', 1902, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1248, 'kaggle-1248', '69Spaghetti69', '69spaghetti69@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=w8sri', 2082, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1249, 'kaggle-1249', 'xlet_cobra', 'xlet_cobra@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3xq2x', 224, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1250, 'kaggle-1250', 'furrutia29', 'furrutia29@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=drurhb', 3485, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1251, 'kaggle-1251', 'SamuelTheMuso', 'samuelthemuso@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lku4va', 13, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1252, 'kaggle-1252', 'koolmemekid', 'koolmemekid@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=nbp1w5', 2530, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1253, 'kaggle-1253', 'zombykillr123', 'zombykillr123@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=7hmo0s9', 1252, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1254, 'kaggle-1254', 'naoki_1010', 'naoki_1010@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=qwat', 3513, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1255, 'kaggle-1255', 'rektitroaster', 'rektitroaster@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=pry4tv', 4034, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1256, 'kaggle-1256', 'theevilnerd42', 'theevilnerd42@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=4lwr4i', 3416, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1257, 'kaggle-1257', 'goingleft', 'goingleft@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ubs0n8', 2514, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1258, 'kaggle-1258', 'xXxBronyxXx', 'xxxbronyxxx@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l3mir', 4586, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1259, 'kaggle-1259', 'EyelobesAndEarbrows', 'eyelobesandearbrows@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=botcb', 1803, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1260, 'kaggle-1260', 'Texastim275', 'texastim275@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=oljxx', 1042, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1261, 'kaggle-1261', 'Bbrazil97', 'bbrazil97@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=epje1i', 1215, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1262, 'kaggle-1262', 'jigokit', 'jigokit@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3tudga', 382, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1263, 'kaggle-1263', 'Vuynjou', 'vuynjou@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lw6h4m', 750, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1264, 'kaggle-1264', 'Huniwatnya1', 'huniwatnya1@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=8h8dq', 2984, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1265, 'kaggle-1265', 'Dovarc', 'dovarc@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=b0u29e', 4144, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1266, 'kaggle-1266', 'MemeKrabs', 'memekrabs@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zi2z8c', 4191, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1267, 'kaggle-1267', 'atr2718', 'atr2718@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dgm7in', 3155, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1268, 'kaggle-1268', 'MRinvalidusername', 'mrinvalidusername@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=42npyz', 4743, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1269, 'kaggle-1269', 'BenZo2020', 'benzo2020@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=elj7gb', 1769, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1270, 'kaggle-1270', 'TheFattestWalrus', 'thefattestwalrus@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cn502o', 1978, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1271, 'kaggle-1271', 'oyon7', 'oyon7@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wiy8s', 1666, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1272, 'kaggle-1272', 'Onix20593', 'onix20593@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=u98sm7', 3283, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1273, 'kaggle-1273', 'realjohncenawwe', 'realjohncenawwe@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=903ce5', 4289, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1274, 'kaggle-1274', 'bcr3125', 'bcr3125@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5zie77', 1252, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1275, 'kaggle-1275', 'JIZZ_VOLCANO', 'jizz_volcano@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=c2wb7', 1947, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1276, 'kaggle-1276', 'dall007', 'dall007@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zdbaj2', 3351, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1277, 'kaggle-1277', 'Snobb1001', 'snobb1001@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fmmuft', 1603, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1278, 'kaggle-1278', 'WynterSkye', 'wynterskye@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yqrihc', 1881, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1279, 'kaggle-1279', 'Harvickfan4Life', 'harvickfan4life@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=9zpdxe', 1077, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1280, 'kaggle-1280', 'yaboytheRyGuy', 'yaboytheryguy@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=itnnig', 84, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1281, 'kaggle-1281', 'COOLYFRY', 'coolyfry@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=x71bvx', 4901, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1282, 'kaggle-1282', 'SilverGryphon', 'silvergryphon@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=15axkw', 1159, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1283, 'kaggle-1283', 'sufan02', 'sufan02@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=eecbkx', 415, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1284, 'kaggle-1284', 'BEISisICE', 'beisisice@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0ss69k', 849, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1285, 'kaggle-1285', 'Sumojoe118', 'sumojoe118@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=withip', 1384, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1286, 'kaggle-1286', 'skypry', 'skypry@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rz4fee', 2474, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1287, 'kaggle-1287', '422121', '422121@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=svc8x3', 3468, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1288, 'kaggle-1288', 'Meikiepeik', 'meikiepeik@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ustbeg', 4299, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1289, 'kaggle-1289', 'Non_French_Sylvain', 'non_french_sylvain@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vh1o97', 4975, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1290, 'kaggle-1290', 'Dadapp94', 'dadapp94@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=takl0u', 2181, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1291, 'kaggle-1291', 'Beebah-Dooba', 'beebah-dooba@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gk14s', 2712, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1292, 'kaggle-1292', 'Joselifts', 'joselifts@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=orpzz4h', 2284, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1293, 'kaggle-1293', 'E_Ezra', 'e_ezra@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3lbsg', 3658, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1294, 'kaggle-1294', 'ProjectileDysfnction', 'projectiledysfnction@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gvqdn', 500, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1295, 'kaggle-1295', 'blackwolf2311', 'blackwolf2311@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dmtn8e', 375, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1296, 'kaggle-1296', 'AFriendlyUsername', 'afriendlyusername@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wr8hnp', 2371, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1297, 'kaggle-1297', 'fetherhead', 'fetherhead@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yys3xs', 4200, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1298, 'kaggle-1298', '_austintyler', '_austintyler@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3yap7t', 1754, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1299, 'kaggle-1299', 'emmababemma3', 'emmababemma3@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=8j3smwi', 4610, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1300, 'kaggle-1300', 'JM-Rie', 'jm-rie@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ggw7rk', 2331, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1301, 'kaggle-1301', 'm4ttlovell', 'm4ttlovell@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3zeytj', 4869, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1302, 'kaggle-1302', 'Dadomaso', 'dadomaso@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dbw0bn', 1563, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1303, 'kaggle-1303', 'ItsOpaz', 'itsopaz@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ru4oky', 3912, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1304, 'kaggle-1304', 'hi_im_horse', 'hi_im_horse@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=khvl9w', 3592, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1305, 'kaggle-1305', 'dankdoobies', 'dankdoobies@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ty8o7', 3152, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1306, 'kaggle-1306', 'TheWingDistrict', 'thewingdistrict@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=iwxm2', 2235, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1307, 'kaggle-1307', 'Lenin_Black', 'lenin_black@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rxvqh6', 3553, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1308, 'kaggle-1308', 'FUMum', 'fumum@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dmpcdm', 2537, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1309, 'kaggle-1309', 'Arva2121', 'arva2121@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ibupg', 3862, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1310, 'kaggle-1310', 'Blunt_Machette', 'blunt_machette@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hzz7lq', 1220, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1311, 'kaggle-1311', 'another_one_bites459', 'another_one_bites459@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=pxmtgi', 2709, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1312, 'kaggle-1312', 'comebepc', 'comebepc@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=h1yyz8', 1910, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1313, 'kaggle-1313', 'maybegay2', 'maybegay2@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=19pco', 1717, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1314, 'kaggle-1314', 'zpcidiot', 'zpcidiot@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ipf4d', 1398, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1315, 'kaggle-1315', 'OnOff_', 'onoff_@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bcxk9c', 3452, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1316, 'kaggle-1316', 'Freedom_cheetos', 'freedom_cheetos@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l32f7', 562, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1317, 'kaggle-1317', 'TEGEKEN', 'tegeken@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=w5sqfg', 3512, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1318, 'kaggle-1318', 'Kareem_7', 'kareem_7@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yg2a2u', 4547, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1319, 'kaggle-1319', 'SurrogateMonkey', 'surrogatemonkey@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=64i5rk', 50, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1320, 'kaggle-1320', 'ZoozBuff', 'zoozbuff@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=iln4b', 4763, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1321, 'kaggle-1321', 'thatguyhanzel', 'thatguyhanzel@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=i2o7lv', 1759, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1322, 'kaggle-1322', 'RiceMuuse', 'ricemuuse@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=h9wrwh', 441, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1323, 'kaggle-1323', 'Memesmakemememe', 'memesmakemememe@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=orvnph', 539, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1324, 'kaggle-1324', 'ishan0102', 'ishan0102@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5chqup', 1476, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1325, 'kaggle-1325', 'seifywashere', 'seifywashere@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=64owzi', 1584, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1326, 'kaggle-1326', 'Gas_ChamberMhd', 'gas_chambermhd@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1iiht7', 2355, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1327, 'kaggle-1327', 'VictorSensei', 'victorsensei@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=54nyja', 1766, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1328, 'kaggle-1328', 'MagicalScarf', 'magicalscarf@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mp8c7f', 3513, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1329, 'kaggle-1329', 'lucario378', 'lucario378@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rtnf99', 759, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1330, 'kaggle-1330', 'Mjfrisch223', 'mjfrisch223@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fh1g6r', 3982, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1331, 'kaggle-1331', 'ArmyAndStuff', 'armyandstuff@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ng7e0m', 1334, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1332, 'kaggle-1332', 'SamPike512', 'sampike512@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=i7sx4v', 383, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1333, 'kaggle-1333', 'VarunBanur', 'varunbanur@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sttplq', 4299, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1334, 'kaggle-1334', 'pepperwood42', 'pepperwood42@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ie7wna', 1475, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1335, 'kaggle-1335', 'FootFetishFrank', 'footfetishfrank@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=oggwvi', 2591, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1336, 'kaggle-1336', 'InsanityOnTheSquare', 'insanityonthesquare@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ooj61d', 1405, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1337, 'kaggle-1337', 'MemesOnAStick', 'memesonastick@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l6a6r', 224, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1338, 'kaggle-1338', 'maxi7cs', 'maxi7cs@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zk6pys', 2519, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1339, 'kaggle-1339', 'B_knight142', 'b_knight142@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=m6bvgl', 4187, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1340, 'kaggle-1340', 'GOPokemonMaster', 'gopokemonmaster@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=awoada', 1140, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1341, 'kaggle-1341', 'Waffle2006', 'waffle2006@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=yrga3n', 1855, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1342, 'kaggle-1342', 'sr_michifus', 'sr_michifus@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=a8mirl', 1235, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1343, 'kaggle-1343', '2Shae22', '2shae22@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vvchx', 2164, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1344, 'kaggle-1344', 'TheBanisherOfRegs', 'thebanisherofregs@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ub1qy', 4237, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1345, 'kaggle-1345', 'John_by_John', 'john_by_john@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=b8b13u', 4743, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1346, 'kaggle-1346', 'Chance0809', 'chance0809@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sahr68', 4962, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1347, 'kaggle-1347', 'pseudocilin', 'pseudocilin@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sag1js', 1673, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1348, 'kaggle-1348', 'derricknh', 'derricknh@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=tj3k55', 3218, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1349, 'kaggle-1349', 'JeNeSuisPasQuiJetais', 'jenesuispasquijetais@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=may7gl', 1547, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1350, 'kaggle-1350', 'goldmelonmaster', 'goldmelonmaster@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ousayn', 3174, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1351, 'kaggle-1351', 'Oryon-', 'oryon-@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sjeg2o', 3042, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1352, 'kaggle-1352', 'tick369', 'tick369@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=g5lha', 921, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1353, 'kaggle-1353', 'ZakAttak18', 'zakattak18@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0s12yk', 4595, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1354, 'kaggle-1354', 'omidelf', 'omidelf@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vwzn6', 1297, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1355, 'kaggle-1355', 'vladislov_', 'vladislov_@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vmy9hb', 1257, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1356, 'kaggle-1356', 'thedok20', 'thedok20@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=veswnb', 1151, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1357, 'kaggle-1357', 'mikeyp1999', 'mikeyp1999@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=adj825', 3129, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1358, 'kaggle-1358', 'whitedeath421', 'whitedeath421@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rkb61n', 3794, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1359, 'kaggle-1359', 'nightwingr', 'nightwingr@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0lwrtp', 3743, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1360, 'kaggle-1360', 'HornyNcurious66', 'hornyncurious66@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=5uybj6', 488, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1361, 'kaggle-1361', 'relational_sense', 'relational_sense@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=fr02s', 91, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1362, 'kaggle-1362', 'Negopos', 'negopos@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=9t0hi1', 913, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1363, 'kaggle-1363', 'tbsgrave', 'tbsgrave@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=nlcgtr', 410, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1364, 'kaggle-1364', 'DasherII', 'dasherii@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=b6b44', 320, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1365, 'kaggle-1365', 'Orangemill', 'orangemill@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cjv6fr', 4858, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1366, 'kaggle-1366', 'purevermonter', 'purevermonter@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=z2xamd', 4587, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1367, 'kaggle-1367', '-Lzr-', '-lzr-@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=m59qsm', 2357, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1368, 'kaggle-1368', 'ArashJuventus', 'arashjuventus@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3gvoe6', 1377, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1369, 'kaggle-1369', 'lordtriad', 'lordtriad@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cjb9z', 658, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1370, 'kaggle-1370', 'slammander', 'slammander@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=h5nf3s', 4269, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1371, 'kaggle-1371', 'RedPillDropper', 'redpilldropper@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l1ze06', 3285, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1372, 'kaggle-1372', 'CleverNameMaker', 'clevernamemaker@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sdsjw', 218, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1373, 'kaggle-1373', 'lilsmooga193119', 'lilsmooga193119@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ghora8', 2681, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1374, 'kaggle-1374', 'dankbob_memepants_', 'dankbob_memepants_@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=f5cn36', 1471, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1375, 'kaggle-1375', 'Stouneris420', 'stouneris420@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rdgee', 454, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1376, 'kaggle-1376', 'Shilpm', 'shilpm@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=qa2jrg', 2761, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1377, 'kaggle-1377', 'ayy01113', 'ayy01113@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ke0pch', 265, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1378, 'kaggle-1378', 'SyntheticStupidity', 'syntheticstupidity@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=x6ov6l', 1336, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1379, 'kaggle-1379', 'YungOldMan', 'yungoldman@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6nlkz', 47, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1380, 'kaggle-1380', 'ClintEatswood_', 'clinteatswood_@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ucfa65', 4958, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1381, 'kaggle-1381', 'thot-exterminator', 'thot-exterminator@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=muvg5', 4164, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1382, 'kaggle-1382', 'Ajthus', 'ajthus@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hye3e', 4218, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1383, 'kaggle-1383', 'DrHolz', 'drholz@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=j3dihp', 1392, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1384, 'kaggle-1384', 'Moshial', 'moshial@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=8wfzfh', 2911, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1385, 'kaggle-1385', 'bloodylipservice', 'bloodylipservice@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=aq55br', 2853, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1386, 'kaggle-1386', 'Sovietekk', 'sovietekk@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cf0lha', 4838, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1387, 'kaggle-1387', 'airnlight_timenspace', 'airnlight_timenspace@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kw2z7b', 1768, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1388, 'kaggle-1388', 'Arda2024', 'arda2024@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vjt7ef', 1704, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1389, 'kaggle-1389', 'SpiderSlayer101', 'spiderslayer101@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=x64v8e', 1588, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1390, 'kaggle-1390', 'spraycheesememes', 'spraycheesememes@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=f055m', 4667, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1391, 'kaggle-1391', 'DrPierreChang', 'drpierrechang@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=pk447i', 1669, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1392, 'kaggle-1392', 'iShankNerds', 'ishanknerds@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=b8ltla', 1095, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1393, 'kaggle-1393', 'emoposer', 'emoposer@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ko6ae', 1008, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1394, 'kaggle-1394', 'vintagewolfgts', 'vintagewolfgts@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bqru6p', 3137, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1395, 'kaggle-1395', 'baranxlr', 'baranxlr@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=u4d45m', 2819, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1396, 'kaggle-1396', 'Pep-Sanchez', 'pep-sanchez@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=txmm4', 3208, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1397, 'kaggle-1397', 'boxcarracer1478', 'boxcarracer1478@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=t99wqg', 1553, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1398, 'kaggle-1398', 'yomanitsdudda', 'yomanitsdudda@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vhwpdk', 717, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1399, 'kaggle-1399', 'l3adw01f', 'l3adw01f@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=rtffce', 3174, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1400, 'kaggle-1400', 'urbanster', 'urbanster@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=7zsh2r', 3632, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1401, 'kaggle-1401', 'Faoneus', 'faoneus@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=dj9jcd', 995, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1402, 'kaggle-1402', 'Omrriii', 'omrriii@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=j4c6k', 4029, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1403, 'kaggle-1403', 'ehammons11', 'ehammons11@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=4dj7cs', 1992, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1404, 'kaggle-1404', 'YoMamaGTA', 'yomamagta@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=n5r2kg', 409, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1405, 'kaggle-1405', 'bdog7171', 'bdog7171@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wr6o8c', 2286, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1406, 'kaggle-1406', 'Imjustanoob0', 'imjustanoob0@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lxxena', 2348, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1407, 'kaggle-1407', 'racixxx', 'racixxx@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=nzmo8c', 2259, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1408, 'kaggle-1408', 'the_real_john_wick', 'the_real_john_wick@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=i24ds8', 4084, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1409, 'kaggle-1409', 'LeafPoster', 'leafposter@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l025c', 1083, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1410, 'kaggle-1410', 'braapstututu', 'braapstututu@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zcv38', 452, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1411, 'kaggle-1411', 'mariobros612', 'mariobros612@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=x97658', 2849, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1412, 'kaggle-1412', 'DimesFromHeaven', 'dimesfromheaven@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gs0ehg', 3392, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1413, 'kaggle-1413', 'PM_ME_YOUR_EGGROLL', 'pm_me_your_eggroll@example.com', 'Just here for the dankest memes.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hdn4t', 1405, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1414, 'kaggle-1414', 'Autistic_Spinning', 'autistic_spinning@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=hgy51c', 3918, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1415, 'kaggle-1415', 'BillNyeThaRedditGuy', 'billnyetharedditguy@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=0ivin', 4426, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1416, 'kaggle-1416', 'GRXP3', 'grxp3@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=cf7tb', 953, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1417, 'kaggle-1417', 'AeonThoth', 'aeonthoth@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=l3lewb', 1361, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1418, 'kaggle-1418', 'shadesofgabe', 'shadesofgabe@example.com', 'I post memes, therefore I am.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=wv4xt', 793, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1419, 'kaggle-1419', 'DaniRV', 'danirv@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vgvbdg', 3316, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1420, 'kaggle-1420', '1SauceyLad', '1sauceylad@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mmmi86', 4939, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1421, 'kaggle-1421', 'humanisopod', 'humanisopod@example.com', 'Certified meme lord.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=77hgil', 4841, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1422, 'kaggle-1422', 'Bold_Wolf', 'bold_wolf@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=42v3j', 2041, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1423, 'kaggle-1423', 'Goaty__McGoatface', 'goaty__mcgoatface@example.com', 'Living one meme at a time.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=zxo1ul', 318, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1424, 'kaggle-1424', 'ruerenegade', 'ruerenegade@example.com', 'Searching for the ultimate reaction image.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jhr29', 3925, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1425, 'kaggle-1425', 'Taher6168', 'taher6168@example.com', 'My life is a joke, but my memes are serious.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6cnnc7', 2263, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1426, 'kaggle-1426', 'TrollerCoaster870', 'trollercoaster870@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=6vzre', 4647, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1427, 'kaggle-1427', 'luddis15', 'luddis15@example.com', 'Meme enthusiast and part-time philosopher.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=c0tulg', 4034, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;
INSERT INTO users (id, supabase_id, username, email, bio, avatar_url, karma, created_at, updated_at) 
VALUES (1428, 'kaggle-1428', 'OveraHype', 'overahype@example.com', 'Professional internet explorer.', 'https://api.dicebear.com/7.x/avataaars/svg?seed=kqns4h', 4951, NOW(), NOW()) 
ON CONFLICT (username) DO UPDATE SET karma = EXCLUDED.karma;

-- 2. Create Communities
INSERT INTO communities (id, name, slug, description, creator_id, created_at, updated_at) 
VALUES (100, 'Memes', 'memes', 'The central hub for all things funny, weird, and relatable.', 1001, NOW(), NOW()) 
ON CONFLICT (slug) DO NOTHING;
INSERT INTO communities (id, name, slug, description, creator_id, created_at, updated_at) 
VALUES (101, 'Dank Memes', 'dankmemes', 'Only the spiciest memes allowed.', 1001, NOW(), NOW()) 
ON CONFLICT (slug) DO NOTHING;

-- 3. Create Posts
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1001, 'Num🅱er One', 'https://i.redd.it/7wgs4dkiihfz.png', 1001, 100, 'image', 8708, 0, 8708, NULL, 'approved', '2017-08-13T10:45:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1002, 'Got ‘em', 'https://i.redd.it/65bzzioisir01.jpg', 1002, 101, 'image', 7525, 0, 7525, NULL, 'approved', '2018-04-12T18:21:27.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1003, '50-0', 'https://i.redd.it/19c4ggoz0ciz.png', 1003, 100, 'image', 6423, 0, 6423, NULL, 'approved', '2017-08-27T19:30:27.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1004, 'Allow', 'https://i.redd.it/qt5p8ozio0a01.png', 1004, 100, 'image', 6338, 0, 6338, NULL, 'approved', '2018-01-14T11:18:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1005, '*mild concern*', 'https://i.redd.it/1cudu2jlgac01.jpg', 1005, 101, 'image', 6145, 0, 6145, NULL, 'approved', '2018-01-25T22:19:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1006, 'I would kill myself again', 'https://i.redd.it/cqtircwmtw701.png', 1006, 100, 'image', 5860, 0, 5860, NULL, 'approved', '2018-01-03T20:10:03.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1007, 'Conspiracy', 'https://i.redd.it/9gx2gd66ehzz.jpg', 1007, 101, 'image', 5854, 0, 5854, NULL, 'approved', '2017-11-22T07:43:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1008, 'Justin Timberlake', 'https://i.redd.it/qq501hb3yae01.jpg', 1008, 100, 'image', 5853, 0, 5853, NULL, 'approved', '2018-02-05T02:04:41.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1009, 'Lit 🔥', 'https://i.redd.it/1zb3bomchdyy.jpg', 1009, 100, 'image', 5726, 0, 5726, NULL, 'approved', '2017-05-19T03:01:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1010, 'Improvise. Adapt. Overcome.', 'https://i.redd.it/ypelzg7uwzpz.jpg', 1010, 100, 'image', 5697, 0, 5697, NULL, 'approved', '2017-10-05T11:18:50.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1011, 'Pornhu🅱️', 'https://i.redd.it/iztb7pk3tk6z.jpg', 1011, 101, 'image', 5586, 0, 5586, NULL, 'approved', '2017-06-29T12:12:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1012, 'F to pay respects', 'https://i.redd.it/chz6snjokx301.jpg', 1012, 101, 'image', 5526, 0, 5526, NULL, 'approved', '2017-12-14T18:25:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1013, 'Big if true.', 'https://i.redd.it/kunghv6xg6c01.jpg', 1013, 100, 'image', 5488, 0, 5488, NULL, 'approved', '2018-01-25T08:53:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1014, 'One gay 🅱️oi', 'https://i.redd.it/1qzhs6apktpz.jpg', 1014, 100, 'image', 5485, 0, 5485, NULL, 'approved', '2017-10-04T14:00:07.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1015, 'Rat faced cunt', 'https://i.redd.it/fecgwv5qmjzz.jpg', 1015, 100, 'image', 5413, 0, 5413, NULL, 'approved', '2017-11-22T15:15:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1016, 'THEY D🅴M 🅱️OIS', 'https://i.redd.it/737jnfeopamz.png', 1016, 100, 'image', 5393, 0, 5393, NULL, 'approved', '2017-09-16T19:30:01.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1017, 'Twitter is boolin’', 'https://i.redd.it/apzai45crjxz.jpg', 1017, 101, 'image', 5375, 0, 5375, NULL, 'approved', '2017-11-12T13:32:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1018, 'Now we know why this man became disloyal and distracted.', 'https://i.imgur.com/5FnBYPZ.jpg', 1018, 100, 'image', 5331, 0, 5331, NULL, 'approved', '2017-09-03T21:25:01.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1019, '10/10', 'https://i.redd.it/0k64ax4qogxy.jpg', 1017, 100, 'image', 5303, 0, 5303, NULL, 'approved', '2017-05-14T12:43:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1020, 'Trump debates in a nutshell:', 'https://i.redd.it/i1k5ksuofhq01.jpg', 1019, 100, 'image', 5278, 0, 5278, NULL, 'approved', '2018-04-07T12:44:43.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1021, 'Turn it off and on again', 'https://i.redd.it/2080xwmvmwb01.jpg', 1020, 100, 'image', 5238, 0, 5238, NULL, 'approved', '2018-01-23T23:48:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1022, 'Literally this whole subreddit right now', 'https://i.redd.it/hq66mek3tloz.jpg', 1021, 100, 'image', 5194, 0, 5194, NULL, 'approved', '2017-09-28T10:48:48.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1023, 'Dank?', 'https://i.redd.it/4ygxmaqll2zy.jpg', 1022, 100, 'image', 5150, 0, 5150, NULL, 'approved', '2017-05-22T15:29:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1024, 'When you''re a computer science specialist', 'https://i.redd.it/cbq06qopykd01.png', 1023, 100, 'image', 5106, 0, 5106, NULL, 'approved', '2018-02-01T10:42:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1025, 'O O F', 'https://i.redd.it/akxlrrcty5n01.jpg', 1024, 101, 'image', 5067, 0, 5067, NULL, 'approved', '2018-03-21T18:57:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1026, 'It’s in the Game.', 'https://i.redd.it/73227ot8uqxz.jpg', 1025, 101, 'image', 5059, 0, 5059, NULL, 'approved', '2017-11-13T13:21:25.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1027, '🅱️acey', 'https://i.redd.it/x0om9470jebz.jpg', 1026, 100, 'image', 5045, 0, 5045, NULL, 'approved', '2017-07-23T20:26:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1028, 'Choose carefully', 'https://i.redd.it/5pmky0z8hrzz.jpg', 1027, 100, 'image', 4938, 0, 4938, NULL, 'approved', '2017-11-23T17:38:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1029, 'Doot', 'https://i.redd.it/vw5smxxv8crz.jpg', 1028, 101, 'image', 4886, 0, 4886, NULL, 'approved', '2017-10-12T05:51:53.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1030, '🅱️LEACH', 'https://i.redd.it/y15baoxirepz.jpg', 1029, 101, 'image', 4799, 0, 4799, NULL, 'approved', '2017-10-02T12:11:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1031, '🅱️apan', 'https://i.redd.it/0jogh3wuwvhz.jpg', 1030, 100, 'image', 4789, 0, 4789, NULL, 'approved', '2017-08-25T13:18:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1032, 'Haha, yes', 'https://i.redd.it/74knd7q0eef01.jpg', 1031, 101, 'image', 4722, 0, 4722, NULL, 'approved', '2018-02-10T14:43:27.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1033, 'Piracy, It’s a crime.', 'https://i.redd.it/qoec8xl3bqaz.jpg', 1032, 101, 'image', 4720, 0, 4720, NULL, 'approved', '2017-07-20T10:58:57.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1034, 'Nintendo', 'https://i.redd.it/u0vbd8zbkca01.jpg', 1033, 101, 'image', 4702, 0, 4702, NULL, 'approved', '2018-01-16T10:58:50.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1035, 'Thank you for everything', 'https://i.redd.it/25wvaa49dpp01.jpg', 1034, 101, 'image', 4689, 0, 4689, NULL, 'approved', '2018-04-03T14:22:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1036, 'Presidential quotes are so inspirational😍', 'https://i.redd.it/3s5m221crg801.jpg', 1035, 100, 'image', 4672, 0, 4672, NULL, 'approved', '2018-01-06T15:12:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1037, 'Winner winner communist dinner', 'https://i.redd.it/6jy7psgpd0kz.jpg', 1036, 101, 'image', 4673, 0, 4673, NULL, 'approved', '2017-09-05T06:28:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1038, 'He finally changed his mind', 'https://i.redd.it/ofj5179jakk01.jpg', 1037, 101, 'image', 4582, 0, 4582, NULL, 'approved', '2018-03-08T15:55:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1039, 'Blockbuster', 'https://i.redd.it/i7b272kbd4401.jpg', 1038, 101, 'image', 4551, 0, 4551, NULL, 'approved', '2017-12-15T17:16:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1040, 'YouTube in a nutshell', 'https://i.redd.it/jvoc3nur5b801.png', 1039, 101, 'image', 4550, 0, 4550, NULL, 'approved', '2018-01-05T20:23:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1041, '(s) (p) (i) (c) (y)', 'https://i.redd.it/5yr7ihm3ad8z.jpg', 1040, 101, 'image', 4528, 0, 4528, NULL, 'approved', '2017-07-08T13:04:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1042, 'Incognito mode', 'https://i.redd.it/y37yqppl00d01.jpg', 1041, 100, 'image', 4527, 0, 4527, NULL, 'approved', '2018-01-29T12:15:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1043, 'Despacito Me', 'https://i.redd.it/j145uk0zxcl01.jpg', 1042, 100, 'image', 4459, 0, 4459, NULL, 'approved', '2018-03-12T16:16:30.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1044, 'Enough is enough', 'https://i.redd.it/enfe8xb6wnlz.jpg', 1043, 101, 'image', 4456, 0, 4456, NULL, 'approved', '2017-09-13T14:37:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1045, 'that was a close one', 'https://i.redd.it/1hwlszryiho01.png', 1044, 100, 'image', 4412, 0, 4412, NULL, 'approved', '2018-03-28T10:53:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1046, 'Help Save Net Neutrality', 'https://i.redd.it/7uewb8risdzz.jpg', 1011, 101, 'image', 4391, 0, 4391, NULL, 'approved', '2017-11-21T19:36:50.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1047, 'M I L L E N I A L S', 'https://i.redd.it/nz6wetlnjjcz.jpg', 1045, 100, 'image', 4361, 0, 4361, NULL, 'approved', '2017-07-29T14:22:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1048, 'If you outlaw emojis, then only outlaws will have the emoji 😤', 'https://i.redd.it/0ucizt92akwz.jpg', 1046, 101, 'image', 4318, 0, 4318, NULL, 'approved', '2017-11-07T14:13:23.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1049, 'Historically accurate meme', 'https://imgur.com/q53kWJD.jpg', 1047, 101, 'image', 4301, 0, 4301, NULL, 'approved', '2018-02-08T17:42:57.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1050, 'Just two slices of brEAd [OC]', 'https://i.redd.it/p4vypvnzgxxz.png', 1048, 101, 'image', 4293, 0, 4293, NULL, 'approved', '2017-11-14T11:40:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1051, 'just got offered a scholarship 😍', 'https://i.redd.it/cxtq8jn2kka01.jpg', 1049, 100, 'image', 4290, 0, 4290, NULL, 'approved', '2018-01-17T06:07:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1052, '🅱️reat 🅱️hite', 'https://i.redd.it/akc2w68cv8bz.jpg', 1050, 101, 'image', 4273, 0, 4273, NULL, 'approved', '2017-07-23T01:24:29.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1053, '"Yet"', 'https://i.redd.it/bznew6eu7kpz.jpg', 1051, 100, 'image', 4256, 0, 4256, NULL, 'approved', '2017-10-03T06:32:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1054, 'At the park', 'https://i.redd.it/98680e9du6qz.jpg', 1052, 101, 'image', 4253, 0, 4253, NULL, 'approved', '2017-10-06T11:49:25.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1055, '(⌐■_■)–︻╦╤─ 😂😂😂😂😂😂', 'http://i.imgur.com/2MWOmRH.jpg', 1053, 101, 'image', 4232, 0, 4232, NULL, 'approved', '2017-04-29T13:39:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1056, 'Future is now', 'https://i.redd.it/icb5mxxsxte01.jpg', 1038, 100, 'image', 4203, 0, 4203, NULL, 'approved', '2018-02-07T17:56:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1057, 'hol up', 'https://i.redd.it/mpdaeygfhjqz.png', 1054, 101, 'image', 4202, 0, 4202, NULL, 'approved', '2017-10-08T05:08:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1058, 'Who truly knows?', 'https://i.redd.it/epbalkssuwh01.jpg', 1055, 101, 'image', 4200, 0, 4200, NULL, 'approved', '2018-02-23T06:57:48.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1059, 'Kim Long Dong', 'https://i.redd.it/8f1qfnwv5v601.jpg', 1056, 101, 'image', 4200, 0, 4200, NULL, 'approved', '2017-12-29T13:30:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1060, 'R.I.P hawking ❤ F', 'https://i.redd.it/g67a64m01ol01.jpg', 1057, 101, 'image', 4199, 0, 4199, NULL, 'approved', '2018-03-14T05:33:14.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1061, '🅱️locked', 'https://i.redd.it/ksjfzbe5y8jz.jpg', 1058, 100, 'image', 4192, 0, 4192, NULL, 'approved', '2017-09-01T10:13:18.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1062, 'Oh shit', 'http://i.imgur.com/4viMr2x.jpg', 1059, 101, 'image', 4191, 0, 4191, NULL, 'approved', '2017-06-13T07:47:40.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1063, 'Gone but forgotten', 'https://i.redd.it/ctckbjkurti01.png', 1060, 101, 'image', 4152, 0, 4152, NULL, 'approved', '2018-02-27T21:40:05.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1064, '🅱lackmail', 'https://i.redd.it/q1zp4mh9cq7z.jpg', 1061, 101, 'image', 4130, 0, 4130, NULL, 'approved', '2017-07-05T07:54:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1065, 'An🅱️hony S🅱️aramu🅱️🅱️i', 'https://i.redd.it/lznbjg4rs1dz.jpg', 1062, 101, 'image', 4124, 0, 4124, NULL, 'approved', '2017-08-01T03:45:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1066, 'Werbs should be executed in public', 'https://i.redd.it/6qzf5g0rr6sz.jpg', 1056, 101, 'image', 4110, 0, 4110, NULL, 'approved', '2017-10-16T12:31:03.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1067, 'Don''t know what''s real anymore', 'https://i.redd.it/vgbzy18ltzuz.jpg', 1063, 100, 'image', 4088, 0, 4088, NULL, 'approved', '2017-10-30T16:22:22.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1068, 'I''m a zucker for pranks', 'https://i.redd.it/u7g5lox8yvn01.jpg', 1064, 100, 'image', 4073, 0, 4073, NULL, 'approved', '2018-03-25T10:20:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1069, 'Stairway to Heaven', 'https://i.redd.it/ddr1i0mazpl01.png', 1065, 100, 'image', 4047, 0, 4047, NULL, 'approved', '2018-03-14T12:07:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1070, 'Humans evolve to survive', 'https://i.redd.it/lwj0xb7vu1h01.jpg', 1066, 101, 'image', 4028, 0, 4028, NULL, 'approved', '2018-02-18T22:43:04.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1071, '[ANNOUNCEMENT] if you are coming here from buzzfeed, you are not welcome. Please just head back to your safe spaces.', 'https://i.redd.it/6ogknj1n025z.jpg', 1067, 100, 'image', 4017, 0, 4017, NULL, 'approved', '2017-06-21T19:56:54.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1072, 'Sp🅾️🅾️ktober is not over', 'https://i.redd.it/y3xxzjkfr7uz.jpg', 1068, 101, 'image', 4012, 0, 4012, NULL, 'approved', '2017-10-26T17:59:21.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1073, 'Doing God’s work', 'https://i.redd.it/mqpihwzlxqm01.jpg', 1069, 101, 'image', 4007, 0, 4007, NULL, 'approved', '2018-03-19T16:23:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1074, 'What''s going on...', 'https://i.redd.it/rtrd5mjq5hqy.jpg', 1070, 100, 'image', 3987, 0, 3987, NULL, 'approved', '2017-04-09T06:50:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1075, 'What is this, a crossover episode', 'https://i.redd.it/j8ux5m05f6yz.jpg', 1071, 101, 'image', 3981, 0, 3981, NULL, 'approved', '2017-11-15T17:45:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1076, 'New Year, New Barack', 'https://i.redd.it/asljisujrwa01.jpg', 1017, 100, 'image', 3974, 0, 3974, NULL, 'approved', '2018-01-18T23:11:01.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1077, 'A true tragedy', 'https://i.redd.it/zu6dxzfhpxwz.jpg', 1072, 100, 'image', 3967, 0, 3967, NULL, 'approved', '2017-11-09T11:23:01.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1078, 'A little update on mr # 1', 'https://i.redd.it/hhdjjtdcu1tz.jpg', 1073, 100, 'image', 3940, 0, 3940, NULL, 'approved', '2017-10-20T21:00:50.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1079, 'Day took er JOBS!', 'https://i.redd.it/y5pgz1x6u9301.jpg', 1074, 100, 'image', 3938, 0, 3938, NULL, 'approved', '2017-12-11T10:35:59.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1080, 'It’s all been leading to this', 'https://i.redd.it/rqvgzlkbr9q01.jpg', 1075, 101, 'image', 3931, 0, 3931, NULL, 'approved', '2018-04-06T10:57:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1081, 'P S Y C H I C', 'https://i.redd.it/bwzjbzuojzh01.jpg', 1076, 100, 'image', 3930, 0, 3930, NULL, 'approved', '2018-02-23T16:00:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1082, '😎 smooth kriminel', 'https://i.redd.it/er5cu0x1gi601.jpg', 1077, 100, 'image', 3924, 0, 3924, NULL, 'approved', '2017-12-27T18:44:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1083, 'Inside blowjob', 'https://i.redd.it/i5cx4wpuz2n01.jpg', 1078, 101, 'image', 3895, 0, 3895, NULL, 'approved', '2018-03-21T08:57:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1084, 'January 2018 in a nutshell', 'https://imgur.com/b3JC99S.jpg', 1079, 100, 'image', 3892, 0, 3892, NULL, 'approved', '2018-01-10T12:29:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1085, 'beauty', 'https://i.redd.it/vxv84irr2cez.jpg', 1080, 101, 'image', 3886, 0, 3886, NULL, 'approved', '2017-08-07T15:24:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1086, '🅱each', 'https://i.redd.it/94jcbf1qt57z.jpg', 1081, 100, 'image', 3885, 0, 3885, NULL, 'approved', '2017-07-02T10:53:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1087, 'please finish this first', 'https://i.redd.it/i3fusrll9ur01.jpg', 1013, 101, 'image', 3885, 0, 3885, NULL, 'approved', '2018-04-14T08:57:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1088, 'How to distort text in MS paint 🤔', 'https://i.redd.it/m8oid538nij01.jpg', 1049, 101, 'image', 3875, 0, 3875, NULL, 'approved', '2018-03-03T09:18:43.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1089, 'Zuccbot.exe has stopped working', 'https://i.redd.it/rq13m5l94gr01.jpg', 1082, 101, 'image', 3870, 0, 3870, NULL, 'approved', '2018-04-12T09:21:56.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1090, 'ballistic missle', 'https://i.redd.it/mlc4e0ituw901.png', 1083, 101, 'image', 3863, 0, 3863, NULL, 'approved', '2018-01-13T22:26:04.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1091, 'We’ve come full circle boys', 'https://i.imgur.com/RJ9eEDH.jpg', 1084, 101, 'image', 3857, 0, 3857, NULL, 'approved', '2017-12-31T11:43:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1092, 'when you don''t know how to make memes 2.0', 'https://i.redd.it/xv3pvj5xittz.png', 1054, 101, 'image', 3852, 0, 3852, NULL, 'approved', '2017-10-24T18:06:57.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1093, 'From r/PrequelMemes', 'https://i.redd.it/5xr8ygvo8nb01.png', 1085, 101, 'image', 3851, 0, 3851, NULL, 'approved', '2018-01-22T17:52:28.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1094, 'Sweet home Alabama', 'https://i.redd.it/6ykpklbvwsl01.jpg', 1086, 100, 'image', 3840, 0, 3840, NULL, 'approved', '2018-03-14T21:59:22.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1095, 'This guy might be onto something here 🤔', 'https://i.redd.it/yq4idcdoy4501.jpg', 1087, 101, 'image', 3818, 0, 3818, NULL, 'approved', '2017-12-20T20:20:03.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1096, 'No shit Sherlock!', 'https://i.imgur.com/RPaYVrm.jpg', 1088, 100, 'image', 3815, 0, 3815, NULL, 'approved', '2017-11-24T08:10:29.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1097, 'd u a l i t y', 'https://i.redd.it/4vndc1xu0fe01.jpg', 1089, 100, 'image', 3804, 0, 3804, NULL, 'approved', '2018-02-05T15:47:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1098, 'SP🅾️🅾️KY', 'https://i.redd.it/xqmzab1tw3vz.jpg', 1090, 101, 'image', 3779, 0, 3779, NULL, 'approved', '2017-10-31T06:07:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1099, 'What the fuck am i supposed to put here?', 'https://i.redd.it/r9aq7eehjar01.jpg', 1091, 100, 'image', 3769, 0, 3769, NULL, 'approved', '2018-04-11T14:37:04.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1100, 'Chronic masturbation 👊🌭💦⚰️', 'https://i.redd.it/v08apbseoqry.jpg', 1092, 101, 'image', 3766, 0, 3766, NULL, 'approved', '2017-04-15T15:55:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1101, 'My favorite inspirational quote', 'https://i.redd.it/095eehum0wf01.png', 1093, 100, 'image', 3762, 0, 3762, NULL, 'approved', '2018-02-13T02:02:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1102, 'BUZZFEED HAS GONE TOO FAR', 'https://i.redd.it/eci2fit8yz6z.jpg', 1094, 101, 'image', 3757, 0, 3757, NULL, 'approved', '2017-07-01T15:08:22.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1103, 'Wow he really did it', 'https://i.redd.it/414gzkal00rz.jpg', 1095, 101, 'image', 3753, 0, 3753, NULL, 'approved', '2017-10-10T12:44:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1104, '🅱ast 🅱ense', 'https://i.redd.it/k37twegr5fuz.jpg', 1096, 100, 'image', 3742, 0, 3742, NULL, 'approved', '2017-10-27T18:52:06.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1105, 'Vax or not to Vax', 'http://i.imgur.com/CyGgLlF.jpg', 1097, 101, 'image', 3739, 0, 3739, NULL, 'approved', '2017-03-25T12:02:52.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1106, 'Hammers', 'https://i.redd.it/h61qqj5ni7ez.jpg', 1098, 100, 'image', 3738, 0, 3738, NULL, 'approved', '2017-08-07T00:03:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1107, 'Expectation != reality', 'https://i.redd.it/0askrzx6414z.jpg', 1099, 100, 'image', 3730, 0, 3730, NULL, 'approved', '2017-06-16T15:50:53.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1108, '/new', 'https://i.redd.it/ps6kiykujnn01.jpg', 1100, 100, 'image', 3726, 0, 3726, NULL, 'approved', '2018-03-24T06:05:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1109, 'Wacko tobacco', 'https://i.redd.it/j64y9jjn9qny.jpg', 1101, 101, 'image', 3724, 0, 3724, NULL, 'approved', '2017-03-26T10:15:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1110, 'Hol'' up', 'https://i.imgur.com/wzcoGXT.jpg', 1102, 101, 'image', 3721, 0, 3721, NULL, 'approved', '2018-02-07T06:45:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1111, 'Luigi is right', 'https://i.redd.it/9ncizydu1ua01.jpg', 1103, 101, 'image', 3699, 0, 3699, NULL, 'approved', '2018-01-18T14:03:01.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1112, '200iq', 'https://i.redd.it/sw8rf21jwii01.jpg', 1104, 100, 'image', 3688, 0, 3688, NULL, 'approved', '2018-02-26T09:06:43.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1113, 'He learned from the best', 'https://i.redd.it/mh63pgkyuz701.jpg', 1105, 100, 'image', 3687, 0, 3687, NULL, 'approved', '2018-01-04T06:23:40.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1114, 'The tables have turned, flat earthers!', 'https://i.redd.it/mepy6jwq07h01.jpg', 1106, 100, 'image', 3685, 0, 3685, NULL, 'approved', '2018-02-19T16:04:50.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1115, 'Memes: Have They Gone Too Far?', 'https://i.redd.it/hcxnqumb73q01.jpg', 1107, 100, 'image', 3685, 0, 3685, NULL, 'approved', '2018-04-05T12:53:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1116, 'Science talks', 'https://i.redd.it/p8h46o4rux501.jpg', 1108, 100, 'image', 3673, 0, 3673, NULL, 'approved', '2017-12-24T21:29:52.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1117, 'EA MARKETING SQUAD', 'https://i.imgur.com/TzbkEjc.png', 1109, 101, 'image', 3661, 0, 3661, NULL, 'approved', '2017-11-13T08:18:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1118, 'Late-stage', 'https://i.redd.it/cc8husnu2h901.png', 1110, 101, 'image', 3647, 0, 3647, NULL, 'approved', '2018-01-11T17:22:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1119, 'We did it, Reddit.', 'https://i.redd.it/7kqz8c08rv301.jpg', 1111, 101, 'image', 3647, 0, 3647, NULL, 'approved', '2017-12-14T12:18:06.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1120, 'Biggest planet', 'https://i.redd.it/2qbu8vry4vq01.jpg', 1112, 100, 'image', 3640, 0, 3640, NULL, 'approved', '2018-04-09T10:49:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1121, 'Insert edgey 911 meme here', 'https://i.redd.it/1rt6atahfujz.jpg', 1113, 101, 'image', 3638, 0, 3638, NULL, 'approved', '2017-09-04T10:27:50.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1122, 'Is iT DEaD YeT?', 'https://i.redd.it/kzuigy5iyuo01.png', 1114, 101, 'image', 3616, 0, 3616, NULL, 'approved', '2018-03-30T08:07:14.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1123, 'Lol just use two squirts', 'https://i.redd.it/oo65vglt9bq01.jpg', 1115, 100, 'image', 3614, 0, 3614, NULL, 'approved', '2018-04-06T16:04:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1124, 'Still Distracted!', 'https://i.imgur.com/XxolBjR.jpg', 1018, 100, 'image', 3606, 0, 3606, NULL, 'approved', '2017-10-12T13:30:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1125, 'press f to pay respect', 'https://i.redd.it/cpuke7tzvqn01.jpg', 1116, 100, 'image', 3586, 0, 3586, NULL, 'approved', '2018-03-24T17:18:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1126, 'A good president understands the struggles of his citizens.', 'https://i.imgur.com/UsxLsxc.png', 1117, 101, 'image', 3570, 0, 3570, NULL, 'approved', '2017-11-08T01:30:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1127, 'CraftShaft', 'https://i.redd.it/9o6fgw096qmz.jpg', 1118, 101, 'image', 3568, 0, 3568, NULL, 'approved', '2017-09-18T23:21:22.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1128, 'The answer is obvious', 'https://i.redd.it/16juqfq8zrk01.jpg', 1037, 101, 'image', 3562, 0, 3562, NULL, 'approved', '2018-03-09T17:46:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1129, 'Poor guy', 'https://i.redd.it/tnlturs8mn201.jpg', 1068, 101, 'image', 3562, 0, 3562, NULL, 'approved', '2017-12-08T07:51:50.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1130, 'The good old days', 'https://i.redd.it/dh5u5jmb4bfz.png', 1046, 101, 'image', 3561, 0, 3561, NULL, 'approved', '2017-08-12T13:14:54.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1131, '🅱️ruh', 'https://i.redd.it/7b4k3bf6llky.jpg', 1119, 101, 'image', 3560, 0, 3560, NULL, 'approved', '2017-03-10T15:19:03.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1132, 'Poor Hilary', 'https://i.redd.it/u86b5313blwx.jpg', 1120, 100, 'image', 3532, 0, 3532, NULL, 'approved', '2016-11-09T12:43:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1133, '(((Our))) President', 'https://i.redd.it/vjxcihfz6znz.jpg', 1097, 101, 'image', 3507, 0, 3507, NULL, 'approved', '2017-09-25T06:45:40.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1134, 'woah', 'https://imgur.com/B9yc0Af.jpg', 1121, 100, 'image', 3506, 0, 3506, NULL, 'approved', '2018-03-15T22:29:03.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1135, 'We better investigate', 'https://i.redd.it/c972ulchlxn01.jpg', 1122, 100, 'image', 3496, 0, 3496, NULL, 'approved', '2018-03-25T15:52:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1136, 'Self actualization achieved', 'https://i.redd.it/7vhx3mcr3xd01.jpg', 1123, 100, 'image', 3496, 0, 3496, NULL, 'approved', '2018-02-03T03:31:30.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1137, '🅱️illary responds', 'https://i.redd.it/w9ox6hkv5rvz.jpg', 1124, 100, 'image', 3487, 0, 3487, NULL, 'approved', '2017-11-03T12:18:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1138, 'The hero we all needed', 'https://i.imgur.com/HY1Hc8z.jpg', 1125, 101, 'image', 3467, 0, 3467, NULL, 'approved', '2018-01-02T18:36:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1139, 'Most important meal of the day', 'https://i.redd.it/lj23h9y5zbuz.jpg', 1126, 100, 'image', 3467, 0, 3467, NULL, 'approved', '2017-10-27T08:09:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1140, 'Ecli🅱️se', 'http://i.imgur.com/vjQU34l.png', 1127, 100, 'image', 3452, 0, 3452, NULL, 'approved', '2017-08-21T18:42:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1141, 'The entire website was flooded in two hours', 'https://i.redd.it/ra9tlfnh4oo01.png', 1128, 100, 'image', 3448, 0, 3448, NULL, 'approved', '2018-03-29T09:05:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1142, 'Somebody once told me 👌', 'https://i.redd.it/nuc4rksdjwuy.png', 1129, 100, 'image', 3447, 0, 3447, NULL, 'approved', '2017-05-01T14:50:18.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1143, 'True Globalisation', 'https://i.redd.it/cla969tbo31z.png', 1130, 101, 'image', 3445, 0, 3445, NULL, 'approved', '2017-06-01T21:16:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1144, '🅱️enis to 🅱️agina', 'https://i.redd.it/nhrmniud684z.jpg', 1131, 100, 'image', 3442, 0, 3442, NULL, 'approved', '2017-06-17T15:35:47.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1145, 'We all know who the real champion is', 'https://i.redd.it/4cfylndqufiz.jpg', 1132, 101, 'image', 3428, 0, 3428, NULL, 'approved', '2017-08-28T08:22:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1146, 'I''ll wait', 'https://i.redd.it/34m280h90evy.png', 1133, 100, 'image', 3427, 0, 3427, NULL, 'approved', '2017-05-04T01:34:48.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1147, 'Fuck you Thats why', 'https://i.redd.it/svg8qfksfnr01.jpg', 1134, 101, 'image', 3428, 0, 3428, NULL, 'approved', '2018-04-13T09:59:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1148, 'Respect wamen', 'https://i.redd.it/egf13b7zakrz.jpg', 1135, 101, 'image', 3424, 0, 3424, NULL, 'approved', '2017-10-13T08:57:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1149, 'Breathing some life into a dead meme', 'http://i.imgur.com/z6xWuvY.jpg', 1053, 100, 'image', 3419, 0, 3419, NULL, 'approved', '2017-08-15T12:46:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1150, 'Tired of winning?', 'https://i.redd.it/074y4um80fny.jpg', 1136, 101, 'image', 3417, 0, 3417, NULL, 'approved', '2017-03-24T20:23:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1151, 'Zoinks', 'https://i.redd.it/wisft8tpplqz.jpg', 1137, 101, 'image', 3405, 0, 3405, NULL, 'approved', '2017-10-08T12:38:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1152, 'COPPED', 'https://i.redd.it/vayybdd4zed01.jpg', 1138, 101, 'image', 3385, 0, 3385, NULL, 'approved', '2018-01-31T14:33:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1153, 'Memes live on.', 'https://i.redd.it/ju2zma1cll5z.jpg', 1139, 101, 'image', 3381, 0, 3381, NULL, 'approved', '2017-06-24T13:46:47.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1154, 'Good ol 60s', 'https://i.redd.it/ax7bfnsx2cvz.jpg', 1140, 100, 'image', 3379, 0, 3379, NULL, 'approved', '2017-11-01T09:35:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1155, 'Rest easy, Keyboard Cat', 'https://i.redd.it/9cpae9s66om01.jpg', 1141, 101, 'image', 3374, 0, 3374, NULL, 'approved', '2018-03-19T07:06:18.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1156, 'Stefan Karl never said that we had to let him go. Here''s proof. Keep up the fight Stefan.', 'https://i.redd.it/yf7rjxttbh6z.png', 1142, 100, 'image', 3374, 0, 3374, NULL, 'approved', '2017-06-29T00:31:05.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1157, 'Stay strong Stefán! We''re all thinking of you 🙏🙌', 'https://i.redd.it/be40tpw5526z.jpg', 1143, 100, 'image', 3373, 0, 3373, NULL, 'approved', '2017-06-26T21:26:23.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1158, '''MERICA', 'https://imgur.com/Afd2udm.jpg', 1144, 101, 'image', 3364, 0, 3364, NULL, 'approved', '2018-01-22T12:07:43.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1159, 'Genesis', 'https://i.redd.it/dixgbvopj8801.png', 1145, 100, 'image', 3358, 0, 3358, NULL, 'approved', '2018-01-05T11:38:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1160, 'Do you noe de wey?', 'https://i.redd.it/k72cvb9i3n801.jpg', 1146, 100, 'image', 3356, 0, 3356, NULL, 'approved', '2018-01-07T12:31:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1161, 'Sorry haters and losers', 'https://i.redd.it/wl00fxq7ctj01.png', 1147, 101, 'image', 3357, 0, 3357, NULL, 'approved', '2018-03-04T21:17:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1162, 'Illusion of choice', 'https://i.redd.it/y6nslxtqrgtz.jpg', 1148, 100, 'image', 3355, 0, 3355, NULL, 'approved', '2017-10-23T03:52:21.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1163, 'I think he completed the game', 'https://i.redd.it/a2bc1t5jeab01.jpg', 1149, 101, 'image', 3353, 0, 3353, NULL, 'approved', '2018-01-20T21:02:39.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1164, 'When something is too popular for it''s own good', 'https://i.redd.it/64rolemt0fn01.png', 1150, 100, 'image', 3353, 0, 3353, NULL, 'approved', '2018-03-23T01:25:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1165, 'How do I get my money back?', 'https://i.redd.it/pbos0dpojm401.jpg', 1151, 100, 'image', 3345, 0, 3345, NULL, 'approved', '2017-12-18T06:23:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1166, 'Wait a minute🤔', 'https://i.redd.it/ufqk5fcc53e01.jpg', 1152, 100, 'image', 3344, 0, 3344, NULL, 'approved', '2018-02-04T00:00:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1167, 'oof my back', 'https://i.redd.it/kwbi2m077ki01.jpg', 1153, 100, 'image', 3340, 0, 3340, NULL, 'approved', '2018-02-26T13:28:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1168, 'Kill him if you have to', 'https://i.redd.it/hj8hnmmgofb01.jpg', 1154, 101, 'image', 3339, 0, 3339, NULL, 'approved', '2018-01-21T14:47:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1169, 'Don''t 🅱use these.', 'https://i.redd.it/t281hn7pbqiz.png', 1155, 100, 'image', 3332, 0, 3332, NULL, 'approved', '2017-08-29T19:38:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1170, 'Turn of events', 'https://i.redd.it/dg0r31yvi0g01.jpg', 1038, 101, 'image', 3331, 0, 3331, NULL, 'approved', '2018-02-13T17:09:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1171, 'Historically accurate meme', 'https://i.imgur.com/5WDeXqB.png', 1156, 100, 'image', 3329, 0, 3329, NULL, 'approved', '2018-02-08T10:24:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1172, 'Ausposting 🇦🇺🐨🇦🇺', 'https://i.redd.it/4b8beiki9w101.jpg', 1157, 101, 'image', 3328, 0, 3328, NULL, 'approved', '2017-12-04T11:52:23.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1173, 'I''m starting to think logan is lying about his eyesight...', 'https://i.redd.it/uxg1y9pwej801.png', 1158, 100, 'image', 3324, 0, 3324, NULL, 'approved', '2018-01-07T00:08:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1174, 'Vroom', 'https://i.redd.it/c6uq74e78ulz.jpg', 1159, 100, 'image', 3316, 0, 3316, NULL, 'approved', '2017-09-14T11:55:19.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1175, 'Dank?', 'https://i.redd.it/yj1henm5wt4z.jpg', 1160, 100, 'image', 3308, 0, 3308, NULL, 'approved', '2017-06-20T16:37:30.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1176, 'Great news from #1', 'https://i.redd.it/stvwsmjwva101.jpg', 1161, 100, 'image', 3302, 0, 3302, NULL, 'approved', '2017-12-01T11:58:40.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1177, '🅱ormies', 'https://i.redd.it/wb3u2sp5306z.jpg', 1162, 100, 'image', 3300, 0, 3300, NULL, 'approved', '2017-06-26T14:31:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1178, 'Brandon', 'https://i.redd.it/m571t0ceok301.jpg', 1163, 101, 'image', 3298, 0, 3298, NULL, 'approved', '2017-12-12T23:02:41.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1179, 'Where we finna put it tho?', 'https://i.redd.it/4wauhwpzn9d01.jpg', 1017, 101, 'image', 3291, 0, 3291, NULL, 'approved', '2018-01-30T20:42:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1180, 'zap zap', 'https://i.redd.it/41nvuwqb4mf01.png', 1164, 100, 'image', 3278, 0, 3278, NULL, 'approved', '2018-02-11T16:43:28.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1181, 'Real shit', 'https://i.redd.it/f9ilq7duhch01.jpg', 1165, 100, 'image', 3276, 0, 3276, NULL, 'approved', '2018-02-20T10:29:34.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1182, 'To be fair you need a high IQ to understand Dora', 'https://i.redd.it/472yfaa7vdqz.png', 1166, 100, 'image', 3267, 0, 3267, NULL, 'approved', '2017-10-07T10:14:56.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1183, 'Miss me with that normie shit', 'https://i.redd.it/k5251lx8beg01.jpg', 1025, 101, 'image', 3262, 0, 3262, NULL, 'approved', '2018-02-15T15:32:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1184, 'Such a wise 🅱️oarder', 'https://i.redd.it/ek3l2bcf94iz.jpg', 1167, 101, 'image', 3248, 0, 3248, NULL, 'approved', '2017-08-26T17:23:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1185, 'Sharing is caring!', 'https://i.imgur.com/aaxtK8f.jpg', 1168, 100, 'image', 3234, 0, 3234, NULL, 'approved', '2017-09-27T12:59:28.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1186, 'You cant have a GPU and CPU in the same PC', 'https://i.redd.it/y7j8qv8ewyi01.jpg', 1169, 100, 'image', 3229, 0, 3229, NULL, 'approved', '2018-02-28T14:54:27.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1187, 'MR WORLDWIDE', 'https://i.redd.it/oh8op65dp71z.jpg', 1170, 100, 'image', 3219, 0, 3219, NULL, 'approved', '2017-06-02T10:47:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1188, 'My Favorite Greek Ruins', 'https://imgur.com/zAMy9YT.jpg', 1171, 100, 'image', 3215, 0, 3215, NULL, 'approved', '2017-12-15T07:50:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1189, 'The Greatest', 'https://i.imgur.com/XwJ8Egy.jpg', 1172, 100, 'image', 3209, 0, 3209, NULL, 'approved', '2017-11-27T13:50:06.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1190, 'Worlds greatest minds', 'https://i.redd.it/jez7u8479h701.png', 1173, 100, 'image', 3206, 0, 3206, NULL, 'approved', '2018-01-01T15:48:40.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1191, 'Birth control', 'https://i.redd.it/kdpjc2vf15h01.jpg', 1174, 100, 'image', 3203, 0, 3203, NULL, 'approved', '2018-02-19T09:25:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1192, 'Is this a crossover episode?', 'https://i.redd.it/bc6owx4pyv401.jpg', 1175, 101, 'image', 3202, 0, 3202, NULL, 'approved', '2017-12-19T14:04:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1193, 'A new strong meme that broke 2018''s biggest obstacle for memes', 'https://i.redd.it/mg2labkbprg01.jpg', 1176, 101, 'image', 3201, 0, 3201, NULL, 'approved', '2018-02-17T12:34:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1194, 'Bamboozled', 'https://i.redd.it/5ricgtr1twk01.jpg', 1177, 100, 'image', 3200, 0, 3200, NULL, 'approved', '2018-03-10T10:00:25.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1195, 'Oh heck', 'https://i.redd.it/i1qjgbpb8vl01.jpg', 1178, 100, 'image', 3198, 0, 3198, NULL, 'approved', '2018-03-15T05:46:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1196, 'every time', 'https://i.redd.it/2l40op9gu2r01.jpg', 1029, 100, 'image', 3180, 0, 3180, NULL, 'approved', '2018-04-10T12:44:28.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1197, 'Essential step to avoid the government', 'https://i.redd.it/ae8g5p5nenh01.jpg', 1179, 100, 'image', 3178, 0, 3178, NULL, 'approved', '2018-02-21T23:11:14.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1198, 'Ayyyy lmao', 'https://i.redd.it/564jploxfziz.jpg', 1180, 100, 'image', 3170, 0, 3170, NULL, 'approved', '2017-08-31T02:15:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1199, 'no swearing plz :)', 'https://i.redd.it/zr4730231le01.png', 1164, 101, 'image', 3168, 0, 3168, NULL, 'approved', '2018-02-06T11:59:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1200, 'True Enlightenment.', 'https://i.redd.it/hl6z07x8jng01.jpg', 1181, 101, 'image', 3168, 0, 3168, NULL, 'approved', '2018-02-16T22:32:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1201, 'President of russia', 'https://i.redd.it/ayx0ki2an3b01.jpg', 1182, 100, 'image', 3169, 0, 3169, NULL, 'approved', '2018-01-19T22:19:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1202, 'Damnit Pai', 'https://i.redd.it/z6awbb33ra601.png', 1183, 101, 'image', 3165, 0, 3165, NULL, 'approved', '2017-12-26T16:52:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1203, '95 🅱️heses', 'https://i.redd.it/uu6lzoey43uz.png', 1184, 100, 'image', 3165, 0, 3165, NULL, 'approved', '2017-10-26T02:26:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1204, 'Y’all forgot about the hot Cheetos', 'https://i.redd.it/afd6am9v13pz.jpg', 1017, 100, 'image', 3161, 0, 3161, NULL, 'approved', '2017-09-30T20:48:14.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1205, 'This time it will work we 🅱️romise', 'https://i.redd.it/thv677fqwpnz.jpg', 1185, 100, 'image', 3161, 0, 3161, NULL, 'approved', '2017-09-23T23:32:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1206, 'Side by side', 'http://i.imgur.com/XOVgOZQ.jpg', 1186, 100, 'image', 3149, 0, 3149, NULL, 'approved', '2017-11-10T18:37:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1207, 'What', 'https://i.redd.it/6xqcrenjb6e01.jpg', 1187, 100, 'image', 3145, 0, 3145, NULL, 'approved', '2018-02-04T10:31:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1208, '*whizzing noises*', 'https://i.redd.it/7l859uxdstb01.png', 1188, 100, 'image', 3143, 0, 3143, NULL, 'approved', '2018-01-23T14:17:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1209, 'Make the smart move', 'https://i.redd.it/f8fb3ay78ak01.jpg', 1189, 101, 'image', 3138, 0, 3138, NULL, 'approved', '2018-03-07T06:04:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1210, '#Pewds4president', 'https://i.redd.it/nnsi6q10semz.jpg', 1190, 100, 'image', 3135, 0, 3135, NULL, 'approved', '2017-09-17T09:01:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1211, 'Dank Pence meme', 'http://i.imgur.com/weWQdVQ.jpg', 1191, 100, 'image', 3130, 0, 3130, NULL, 'approved', '2017-02-27T12:06:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1212, 'In🅱️4 wage gap', 'http://i.imgur.com/WnYQaxv.jpg', 1192, 100, 'image', 3128, 0, 3128, NULL, 'approved', '2017-05-24T21:12:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1213, 'haha yes', 'https://i.imgur.com/qdYAn5Z.jpg', 1193, 101, 'image', 3122, 0, 3122, NULL, 'approved', '2018-01-12T14:48:05.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1214, 'Gotcha NASA!', 'https://i.redd.it/2z5zoktg7cn01.jpg', 1007, 101, 'image', 3118, 0, 3118, NULL, 'approved', '2018-03-22T15:56:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1215, 'Let me in your swamp', 'https://i.redd.it/ok6zv9k7ix8z.jpg', 1194, 100, 'image', 3115, 0, 3115, NULL, 'approved', '2017-07-11T09:03:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1216, 'Colin Kae🅱ernick', 'https://i.redd.it/1ehftq5kb0oz.png', 1195, 100, 'image', 3108, 0, 3108, NULL, 'approved', '2017-09-25T10:34:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1217, 'S🅱️iderman', 'https://i.redd.it/xua5i42tzgmz.jpg', 1196, 101, 'image', 3106, 0, 3106, NULL, 'approved', '2017-09-17T16:29:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1218, 'It''s okay guys, they''re gay.', 'https://i.redd.it/8x97nh1cusxz.png', 1197, 101, 'image', 3105, 0, 3105, NULL, 'approved', '2017-11-13T20:05:27.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1219, 'The end of an era', 'https://i.redd.it/r3iva58pcfwz.png', 1198, 100, 'image', 3104, 0, 3104, NULL, 'approved', '2017-11-06T21:39:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1220, 'Worst trade deal', 'https://i.redd.it/ax4e3k3d1wmy.jpg', 1199, 101, 'image', 3103, 0, 3103, NULL, 'approved', '2017-03-22T04:35:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1221, 'This looks like a jo🅱️ for me', 'https://i.redd.it/mpoy8418uihz.jpg', 1200, 101, 'image', 3099, 0, 3099, NULL, 'approved', '2017-08-23T17:21:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1222, 'Minor details, you say? 💣', 'https://i.redd.it/dxxx0sxgain01.jpg', 1037, 100, 'image', 3096, 0, 3096, NULL, 'approved', '2018-03-23T12:23:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1223, 'Sweet Home Alabama', 'https://i.imgur.com/tc5Y2bw.png', 1201, 101, 'image', 3077, 0, 3077, NULL, 'approved', '2017-12-22T15:19:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1224, 'TAP TAP TAP TAP TAP', 'https://i.imgur.com/EOlv1RA.png', 1202, 101, 'image', 3069, 0, 3069, NULL, 'approved', '2018-03-02T15:59:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1225, 'Ni🅱️🅱️a why', 'https://i.redd.it/ow8g408ve65z.jpg', 1029, 100, 'image', 3066, 0, 3066, NULL, 'approved', '2017-06-22T10:43:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1226, 'Am I a mod now?', 'https://i.redd.it/kzy67f5g2m0z.jpg', 1203, 100, 'image', 3054, 0, 3054, NULL, 'approved', '2017-05-30T10:02:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1227, 'You see??', 'https://i.redd.it/f0gnmsi7qqc01.jpg', 1187, 100, 'image', 3051, 0, 3051, NULL, 'approved', '2018-01-28T05:00:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1228, 'ayy why not both??', 'https://i.redd.it/lz75nv1ttcr01.jpg', 1204, 100, 'image', 3051, 0, 3051, NULL, 'approved', '2018-04-11T22:18:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1229, 'Brains expand, or do they?', 'https://i.redd.it/arnh9dfdhpo01.jpg', 1205, 100, 'image', 3045, 0, 3045, NULL, 'approved', '2018-03-29T13:39:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1230, 'A Man Of Culture', 'https://i.redd.it/1yq22lg10th01.png', 1206, 100, 'image', 3044, 0, 3044, NULL, 'approved', '2018-02-22T18:01:19.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1231, 'Very yummy', 'https://i.redd.it/w19jo3ckp8r01.jpg', 1207, 100, 'image', 3042, 0, 3042, NULL, 'approved', '2018-04-11T08:27:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1232, 'True', 'https://i.redd.it/q84rhl5z8agz.png', 1166, 101, 'image', 3039, 0, 3039, NULL, 'approved', '2017-08-17T11:24:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1233, 'Merry Christmas bitches', 'https://i.redd.it/eso5bp0ez4601.png', 1208, 101, 'image', 3034, 0, 3034, NULL, 'approved', '2017-12-25T21:28:14.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1234, 'YA LIKE JAZZ', 'https://i.redd.it/f054kjg5gkuz.jpg', 1209, 101, 'image', 3030, 0, 3030, NULL, 'approved', '2017-10-28T12:39:15.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1235, 'Oil', 'http://i.imgur.com/IPqsQqY.png', 1210, 101, 'image', 3028, 0, 3028, NULL, 'approved', '2017-08-06T15:21:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1236, 'Possible new format?', 'https://i.redd.it/1sem3nmyuim01.jpg', 1187, 101, 'image', 3027, 0, 3027, NULL, 'approved', '2018-03-18T13:14:29.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1237, 'impossible...', 'https://i.redd.it/ezyvy4eg9cnz.png', 1211, 100, 'image', 3018, 0, 3018, NULL, 'approved', '2017-09-22T01:39:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1238, 'Christian Subreddit', 'https://i.redd.it/yc9i68gknexz.jpg', 1212, 101, 'image', 3017, 0, 3017, NULL, 'approved', '2017-11-11T20:22:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1239, 'Ajit Pie', 'https://i.imgur.com/pXW79Al.png', 1213, 100, 'image', 3013, 0, 3013, NULL, 'approved', '2017-12-16T09:26:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1240, 'Nein du', 'https://i.redd.it/iv6b6uvxcan01.png', 1214, 100, 'image', 3009, 0, 3009, NULL, 'approved', '2018-03-22T09:43:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1241, 'gotta save it for later', 'https://i.redd.it/6nhe1qndq5001.png', 1095, 100, 'image', 3008, 0, 3008, NULL, 'approved', '2017-11-25T17:35:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1242, 'Logan "Quality Content" Paul', 'https://i.redd.it/e1rp5kknvm701.jpg', 1215, 101, 'image', 3004, 0, 3004, NULL, 'approved', '2018-01-02T10:43:59.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1243, 'Thats messed.', 'https://i.redd.it/n2ozmut8izk01.jpg', 1216, 100, 'image', 3004, 0, 3004, NULL, 'approved', '2018-03-10T19:05:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1244, 'We''ve all been there', 'https://i.redd.it/j8t0u65w6nrz.jpg', 1217, 101, 'image', 2998, 0, 2998, NULL, 'approved', '2017-10-13T18:40:18.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1245, 'USSR isn''t just a physical entity', 'https://i.redd.it/xotah2h2mi1z.jpg', 1218, 101, 'image', 2997, 0, 2997, NULL, 'approved', '2017-06-03T23:29:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1246, '*mindblown*', 'https://i.redd.it/3i1ulf16bf901.jpg', 1219, 101, 'image', 2989, 0, 2989, NULL, 'approved', '2018-01-11T11:24:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1247, 'Us brits are very smug', 'https://i.redd.it/v02f0gvsmo401.jpg', 1220, 101, 'image', 2988, 0, 2988, NULL, 'approved', '2017-12-18T13:25:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1248, 'mods are fags', 'https://i.redd.it/o03u9yiu64r01.jpg', 1221, 100, 'image', 2987, 0, 2987, NULL, 'approved', '2018-04-10T18:18:57.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1249, 'Poor guy', 'https://i.redd.it/10ojx2nb57k01.jpg', 1222, 101, 'image', 2981, 0, 2981, NULL, 'approved', '2018-03-06T19:42:53.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1250, 'Quite Unlucky', 'https://i.redd.it/rydfp16ih0cz.jpg', 1223, 101, 'image', 2974, 0, 2974, NULL, 'approved', '2017-07-26T22:16:49.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1251, 'that''s actually more difficult than it looks', 'https://i.imgur.com/QxQYdEn.png', 1224, 101, 'image', 2967, 0, 2967, NULL, 'approved', '2018-03-03T18:04:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1252, 'Incredible', 'https://i.redd.it/y5qzxfxjz2oz.jpg', 1225, 100, 'image', 2966, 0, 2966, NULL, 'approved', '2017-09-25T19:31:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1253, 'Shitpost', 'https://i.redd.it/8kyweovnouyz.jpg', 1226, 101, 'image', 2956, 0, 2956, NULL, 'approved', '2017-11-19T03:21:18.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1254, 'Only on 🅱ornhu🅿', 'https://i.redd.it/1v7mqg5lcetz.png', 1227, 100, 'image', 2957, 0, 2957, NULL, 'approved', '2017-10-22T15:04:29.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1255, 'Hotel 🅱️ario', 'https://i.redd.it/um4w0mzxt7oz.jpg', 1228, 100, 'image', 2956, 0, 2956, NULL, 'approved', '2017-09-26T11:48:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1256, '🅱️ip', 'https://i.redd.it/lej4zh5o2uaz.jpg', 1229, 100, 'image', 2951, 0, 2951, NULL, 'approved', '2017-07-20T23:40:15.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1257, 'Protection.', 'https://i.redd.it/1xfoqt97ziyz.jpg', 1230, 100, 'image', 2950, 0, 2950, NULL, 'approved', '2017-11-17T11:59:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1258, 'It''s official! Robbie Rotten wins Meme of the Year for 2016!! Congratulations Robbie and HAPPY NEW YEAR EVERYONE! Lets make 2017 even danker!', 'http://i.imgur.com/GrC3UAA.jpg', 1231, 101, 'image', 2942, 0, 2942, NULL, 'approved', '2017-01-01T05:21:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1259, 'we ain''t even safe knifing the walls anymore', 'https://i.redd.it/44b6x9v7xsn01.png', 1232, 100, 'image', 2931, 0, 2931, NULL, 'approved', '2018-03-25T00:09:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1260, '🅱️AD 🅱️OYS', 'https://i.redd.it/syei50b3ws7z.jpg', 1233, 100, 'image', 2926, 0, 2926, NULL, 'approved', '2017-07-05T16:27:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1261, 'As long as you say “No Homo” it isn’t gay', 'https://i.redd.it/etargubgqgc01.jpg', 1025, 101, 'image', 2919, 0, 2919, NULL, 'approved', '2018-01-26T19:24:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1262, 'I know the second great meme war is going on, but i just found this breaking news on twitter', 'https://i.redd.it/dlmcv0jib38z.png', 1234, 100, 'image', 2919, 0, 2919, NULL, 'approved', '2017-07-07T03:32:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1263, 'The language of love', 'https://i.redd.it/ayowjs5d03mz.jpg', 1235, 101, 'image', 2918, 0, 2918, NULL, 'approved', '2017-09-15T17:27:28.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1264, 'We can’t go back', 'https://i.redd.it/8coa0jsm2t301.jpg', 1236, 101, 'image', 2913, 0, 2913, NULL, 'approved', '2017-12-14T03:16:43.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1265, 'Got the scholarship bois.', 'https://i.redd.it/mzvlc7n2o7e01.jpg', 1237, 100, 'image', 2904, 0, 2904, NULL, 'approved', '2018-02-04T15:03:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1266, 'Search your feelings.. you know it to be true', 'https://i.redd.it/ztoznumfp7zz.jpg', 1238, 100, 'image', 2895, 0, 2895, NULL, 'approved', '2017-11-20T23:09:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1267, 'You Guys Ready?', 'https://i.redd.it/nda2tqf0f6wx.jpg', 1239, 101, 'image', 2889, 0, 2889, NULL, 'approved', '2016-11-07T10:38:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1268, 'tfw when you''re a paid shill', 'https://i.redd.it/dez0ndh48j2z.jpg', 1240, 101, 'image', 2889, 0, 2889, NULL, 'approved', '2017-06-09T02:38:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1269, 'It gives you something to 🅱️elieve in, or something to 🅱️e afraid of.', 'https://i.redd.it/ykltd18wdjvz.jpg', 1241, 101, 'image', 2883, 0, 2883, NULL, 'approved', '2017-11-02T10:10:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1270, '*freedom intensifies*', 'https://i.redd.it/csms2o02ajl01.jpg', 1242, 100, 'image', 2883, 0, 2883, NULL, 'approved', '2018-03-13T13:34:56.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1271, 'Remember, no doctor.', 'https://i.imgur.com/c9yUtWr.jpg', 1243, 100, 'image', 2882, 0, 2882, NULL, 'approved', '2017-04-10T22:56:49.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1272, 'Stable economic genius', 'https://i.redd.it/jj1njcsrmnj01.jpg', 1244, 100, 'image', 2875, 0, 2875, NULL, 'approved', '2018-03-04T02:07:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1273, '🅱️um', 'https://i.redd.it/4s5q86zjm0uz.jpg', 1245, 101, 'image', 2873, 0, 2873, NULL, 'approved', '2017-10-25T17:59:30.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1274, 'I can''t believe I actually spent time on doing this', 'https://i.redd.it/jvndgqdg10sz.png', 1246, 101, 'image', 2872, 0, 2872, NULL, 'approved', '2017-10-15T13:53:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1275, 'The patriarchy strikes again', 'http://i.imgur.com/BOdJsky.jpg', 1192, 101, 'image', 2868, 0, 2868, NULL, 'approved', '2017-05-27T20:18:27.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1276, 'Science lol', 'http://i.imgur.com/Sa6dnVR.jpg', 1247, 100, 'image', 2867, 0, 2867, NULL, 'approved', '2017-05-08T13:20:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1277, 'Europe have gay mom lul', 'https://i.redd.it/2mkpxsae2zp01.png', 1248, 101, 'image', 2865, 0, 2865, NULL, 'approved', '2018-04-04T22:58:23.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1278, 'US vs Ethiopia language differences', 'https://i.imgur.com/BahcYL5.jpg', 1249, 100, 'image', 2860, 0, 2860, NULL, 'approved', '2017-07-02T23:51:53.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1279, 'flat earth', 'https://i.redd.it/v92yfbqvu1qz.jpg', 1250, 101, 'image', 2858, 0, 2858, NULL, 'approved', '2017-10-05T17:51:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1280, 'Bionivles made me fail Nonutnovember', 'https://i.redd.it/4xnhiuzr2zvz.jpg', 1056, 100, 'image', 2853, 0, 2853, NULL, 'approved', '2017-11-04T14:55:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1281, 'The NSA', 'https://i.redd.it/lo84fxqu6mxz.jpg', 1251, 101, 'image', 2843, 0, 2843, NULL, 'approved', '2017-11-12T21:43:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1282, 'Kachow', 'https://i.redd.it/aapb02bnvc0z.png', 1252, 101, 'image', 2839, 0, 2839, NULL, 'approved', '2017-05-29T03:07:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1283, 'Very high IQ', 'https://i.redd.it/suprbshipgnz.jpg', 1253, 101, 'image', 2830, 0, 2830, NULL, 'approved', '2017-09-22T16:36:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1284, 'W🅾️KE CL🅰️SSR🅾️🅾️M', 'https://i.redd.it/yrek7p7rphkz.png', 1254, 100, 'image', 2831, 0, 2831, NULL, 'approved', '2017-09-07T16:54:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1285, 'How Japanese people view it.', 'https://i.redd.it/xoma7o6gk8qz.jpg', 1255, 101, 'image', 2827, 0, 2827, NULL, 'approved', '2017-10-06T16:26:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1286, 'The story of a normie', 'https://i.redd.it/vxrf88un9egy.png', 1256, 100, 'image', 2827, 0, 2827, NULL, 'approved', '2017-02-17T10:25:43.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1287, 'wikihow, my dad needs your help', 'https://i.redd.it/4cok89wokma01.jpg', 1257, 101, 'image', 2824, 0, 2824, NULL, 'approved', '2018-01-17T12:54:25.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1288, 'Go for it Kim', 'https://i.redd.it/sjipsr67u2gz.png', 1166, 101, 'image', 2824, 0, 2824, NULL, 'approved', '2017-08-16T10:28:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1289, '♑ℹ️🅱️🅱️🅰️', 'https://i.redd.it/g25o9ovrfohz.jpg', 1258, 100, 'image', 2821, 0, 2821, NULL, 'approved', '2017-08-24T12:10:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1290, 'Philosopher''s Stone', 'https://i.redd.it/nb2onusycwp01.jpg', 1259, 101, 'image', 2819, 0, 2819, NULL, 'approved', '2018-04-04T13:52:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1291, 'Nickelodeon: "Hold my Beer"', 'https://i.redd.it/8hhtw6y8aym01.jpg', 1260, 100, 'image', 2816, 0, 2816, NULL, 'approved', '2018-03-20T17:08:05.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1292, 'Press F to pay respects', 'https://i.redd.it/vvf4m0us26a01.jpg', 1261, 100, 'image', 2814, 0, 2814, NULL, 'approved', '2018-01-15T05:25:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1293, 'Trump is the new Commanda', 'https://i.redd.it/i7ghgn09ot801.jpg', 1262, 101, 'image', 2813, 0, 2813, NULL, 'approved', '2018-01-08T10:38:54.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1294, 'Home 🅱️lone', 'https://i.redd.it/tww1qvaod0tz.jpg', 1263, 100, 'image', 2811, 0, 2811, NULL, 'approved', '2017-10-20T16:05:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1295, 'That was his genius plan all along', 'https://i.redd.it/1nesv3lqo1801.png', 1264, 101, 'image', 2809, 0, 2809, NULL, 'approved', '2018-01-04T12:32:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1296, 'Because y’all keep complaining...', 'https://i.redd.it/zae5hcdwxxq01.jpg', 1265, 100, 'image', 2806, 0, 2806, NULL, 'approved', '2018-04-09T20:16:23.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1297, 'He right let''s do it', 'https://i.redd.it/qnl9x6yq5sf01.jpg', 1266, 100, 'image', 2797, 0, 2797, NULL, 'approved', '2018-02-12T13:02:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1298, '???', 'https://i.redd.it/khcwbrvsgymy.jpg', 1267, 100, 'image', 2791, 0, 2791, NULL, 'approved', '2017-03-22T12:45:56.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1299, 'Opened this sub today and', 'http://i.imgur.com/pSOI6Y2h.jpg', 1268, 101, 'image', 2782, 0, 2782, NULL, 'approved', '2017-07-13T18:49:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1300, 'Lock and Load', 'https://i.redd.it/d4ikgqalgejy.jpg', 1269, 100, 'image', 2770, 0, 2770, NULL, 'approved', '2017-03-04T14:17:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1301, 'On 9/11', 'https://i.redd.it/9pn32bor2hlz.jpg', 1270, 101, 'image', 2767, 0, 2767, NULL, 'approved', '2017-09-12T15:41:41.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1302, 'Face taken over captain. Over.', 'https://i.redd.it/95elgyfjchl01.jpg', 1271, 101, 'image', 2766, 0, 2766, NULL, 'approved', '2018-03-13T07:05:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1303, 'Chuckles', 'https://i.imgur.com/qJSie2f.jpg', 1272, 100, 'image', 2763, 0, 2763, NULL, 'approved', '2018-04-04T07:08:15.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1304, 'Mis🅱️endering', 'https://i.imgur.com/hALfPE3.jpg', 1273, 101, 'image', 2756, 0, 2756, NULL, 'approved', '2017-09-22T11:42:54.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1305, '🅱️r🅾️tec', 'https://i.redd.it/0u1mmirj5l8z.jpg', 1274, 101, 'image', 2753, 0, 2753, NULL, 'approved', '2017-07-09T15:30:41.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1306, 'Did it feel good though?👌', 'https://i.redd.it/serteyx9u4qz.png', 1275, 101, 'image', 2750, 0, 2750, NULL, 'approved', '2017-10-06T03:54:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1307, 'wah irl', 'https://i.redd.it/mt9n3a97krd01.jpg', 1276, 100, 'image', 2749, 0, 2749, NULL, 'approved', '2018-02-02T08:53:04.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1308, 'Please 🅱 Careful.', 'https://i.redd.it/duwxh5flu7vz.jpg', 1017, 101, 'image', 2749, 0, 2749, NULL, 'approved', '2017-10-31T19:21:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1309, 'REEEEEEEEEEEEEEEEEEEEEEEEEEE', 'https://i.redd.it/nxpbq4nm0m4z.png', 1277, 101, 'image', 2749, 0, 2749, NULL, 'approved', '2017-06-19T14:08:52.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1310, 'Decisions Decisions...', 'https://i.redd.it/wytvnmcv2mzz.png', 1278, 101, 'image', 2741, 0, 2741, NULL, 'approved', '2017-11-22T23:29:18.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1311, 'So Deep', 'https://imgur.com/I7naTIp.jpg', 1279, 100, 'image', 2741, 0, 2741, NULL, 'approved', '2017-11-24T14:42:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1312, 'We did it Reddit', 'https://i.redd.it/k6ds5mtvy6301.jpg', 1280, 100, 'image', 2735, 0, 2735, NULL, 'approved', '2017-12-11T00:56:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1313, '2018 is off to a terrible start', 'https://i.redd.it/ybuqn84euu701.png', 1166, 100, 'image', 2734, 0, 2734, NULL, 'approved', '2018-01-03T13:31:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1314, 'Flights booked!!', 'https://i.redd.it/vzkzkildsw001.png', 1281, 101, 'image', 2735, 0, 2735, NULL, 'approved', '2017-11-29T12:33:59.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1315, 'Crack this one', 'https://i.redd.it/6fzaajkqck101.png', 1282, 101, 'image', 2733, 0, 2733, NULL, 'approved', '2017-12-02T19:49:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1316, 'orange', 'https://i.redd.it/vah4zbqvfdk01.png', 1283, 100, 'image', 2732, 0, 2732, NULL, 'approved', '2018-03-07T16:53:05.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1317, 'Biggest Mysteries', 'https://i.redd.it/a3ropf23kv2z.png', 1284, 101, 'image', 2730, 0, 2730, NULL, 'approved', '2017-06-10T20:05:18.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1318, 'dog 🅱ites again 🅱nn', 'https://i.redd.it/0tbc7yn52x7z.jpg', 1250, 100, 'image', 2727, 0, 2727, NULL, 'approved', '2017-07-06T06:29:07.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1319, 'Top 10 Anime Betrayals', 'https://imgur.com/FuomzMp.jpg', 1285, 100, 'image', 2724, 0, 2724, NULL, 'approved', '2018-04-13T03:19:01.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1320, 'Old 🅱️ones', 'https://i.redd.it/566euq8suo6z.jpg', 1286, 100, 'image', 2714, 0, 2714, NULL, 'approved', '2017-06-30T01:49:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1321, 'Explain this.', 'https://i.redd.it/e7ic0lktcj501.jpg', 1287, 101, 'image', 2706, 0, 2706, NULL, 'approved', '2017-12-22T20:44:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1322, 'New format', 'https://i.redd.it/co66o8omn5m01.jpg', 1288, 101, 'image', 2704, 0, 2704, NULL, 'approved', '2018-03-16T16:50:15.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1323, 'Stalin', 'https://i.redd.it/y44fakdxxswz.jpg', 1289, 101, 'image', 2693, 0, 2693, NULL, 'approved', '2017-11-08T19:21:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1324, 'Oh damn', 'https://i.redd.it/y8lktpc76pq01.png', 1290, 100, 'image', 2688, 0, 2688, NULL, 'approved', '2018-04-08T14:44:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1325, 'A god damn tragedy', 'https://i.redd.it/9sqs4a4iu1c01.jpg', 1291, 100, 'image', 2686, 0, 2686, NULL, 'approved', '2018-01-24T17:20:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1326, 'Enlightened', 'https://i.redd.it/oq28d4oq1kn01.jpg', 1292, 101, 'image', 2683, 0, 2683, NULL, 'approved', '2018-03-23T18:18:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1327, 'C🅰️ptian 🅱️ietnam', 'http://i.imgur.com/eqiwNCt.jpg', 1293, 101, 'image', 2660, 0, 2660, NULL, 'approved', '2017-04-04T23:06:14.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1328, '🅱️ooty', 'https://i.redd.it/6qy7d2aj06ly.png', 1294, 100, 'image', 2657, 0, 2657, NULL, 'approved', '2017-03-13T12:01:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1329, 'Mandatory Hitler meme', 'https://i.redd.it/02ot2f3ajnjz.jpg', 1295, 101, 'image', 2649, 0, 2649, NULL, 'approved', '2017-09-03T11:16:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1330, 'On my way!', 'https://i.redd.it/8cul1swpckf01.png', 1296, 100, 'image', 2648, 0, 2648, NULL, 'approved', '2018-02-11T10:47:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1331, 'The biggest catastrophe this weekend', 'https://i.redd.it/qphg97zhtvkz.jpg', 1046, 100, 'image', 2636, 0, 2636, NULL, 'approved', '2017-09-09T16:12:19.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1332, 'Eat!', 'https://i.redd.it/yxdu92m254k01.jpg', 1297, 100, 'image', 2633, 0, 2633, NULL, 'approved', '2018-03-06T09:36:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1333, 'p̤̈ë̤ẗ̤ï̤ẗ̤ï̤ö̤n̤̈ ẗ̤ö̤ c̤̈ḧ̤ä̤n̤̈g̤̈ë̤ r̤̈/d̤̈ä̤n̤̈k̤̈m̤̈ë̤m̤̈ë̤s̤̈ l̤̈ö̤g̤̈ö̤', 'https://i.redd.it/l22c8ti4v5i01.jpg', 1298, 101, 'image', 2619, 0, 2619, NULL, 'approved', '2018-02-24T13:15:41.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1334, 'That time of year 🎃', 'https://i.redd.it/3k9xopnj9tqz.jpg', 1299, 101, 'image', 2617, 0, 2617, NULL, 'approved', '2017-10-09T14:01:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1335, 'I feel dumber with each visit', 'https://i.redd.it/0unolggw0r101.jpg', 1300, 100, 'image', 2616, 0, 2616, NULL, 'approved', '2017-12-03T18:15:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1336, 'They made the right choice, who would make our watches if we lost them?', 'https://i.redd.it/gb0cgulc6q201.jpg', 1301, 101, 'image', 2617, 0, 2617, NULL, 'approved', '2017-12-08T16:28:06.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1337, 'Time to go to heaven', 'https://i.redd.it/ibpvv463b5az.jpg', 1302, 101, 'image', 2608, 0, 2608, NULL, 'approved', '2017-07-17T12:21:29.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1338, '1929 was rough year', 'https://i.redd.it/3blmjda9w4ny.jpg', 1303, 101, 'image', 2603, 0, 2603, NULL, 'approved', '2017-03-23T10:23:56.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1339, 'Mods = Homosexuals', 'https://i.redd.it/ivopyxewcniz.png', 1003, 100, 'image', 2599, 0, 2599, NULL, 'approved', '2017-08-29T09:36:47.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1340, '🅱️epis', 'https://i.imgur.com/Z7TqXX8.png', 1304, 101, 'image', 2598, 0, 2598, NULL, 'approved', '2017-09-30T03:48:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1341, 'O shit had to miss elf practice', 'https://i.redd.it/xqukizumse501.jpg', 1305, 101, 'image', 2585, 0, 2585, NULL, 'approved', '2017-12-22T05:24:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1342, 'New Meme Format is 🅱️ank', 'https://i.redd.it/q3qz2xagqpgz.jpg', 1017, 101, 'image', 2582, 0, 2582, NULL, 'approved', '2017-08-19T15:28:05.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1343, '*a funny title*', 'https://i.redd.it/724yo43cfcjz.png', 1306, 101, 'image', 2580, 0, 2580, NULL, 'approved', '2017-09-01T21:54:57.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1344, 'Fake news', 'https://i.redd.it/4ipkmu6vy58z.jpg', 1307, 101, 'image', 2579, 0, 2579, NULL, 'approved', '2017-07-07T12:26:30.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1345, 'The answer may change the world', 'https://i.redd.it/5tcorjbckqa01.jpg', 1175, 101, 'image', 2576, 0, 2576, NULL, 'approved', '2018-01-18T02:19:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1346, 'The Flag of The United States', 'https://i.redd.it/mmw7yy4d88lz.jpg', 1308, 101, 'image', 2572, 0, 2572, NULL, 'approved', '2017-09-11T09:58:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1347, 'Wise words', 'https://i.redd.it/gs594zr83xdz.jpg', 1309, 100, 'image', 2571, 0, 2571, NULL, 'approved', '2017-08-05T12:59:53.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1348, 'To my mates if you guys are seeing this, I''m still expecting those pens back', 'https://i.redd.it/o3fw41um36f01.jpg', 1310, 100, 'image', 2569, 0, 2569, NULL, 'approved', '2018-02-09T10:50:59.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1349, 'Lets make dragon donkey hybrid babies', 'https://i.redd.it/mwmviw6x91201.jpg', 1311, 101, 'image', 2565, 0, 2565, NULL, 'approved', '2017-12-05T04:43:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1350, 'Help us save Pepe. Pepe is NOT a hate symbol', 'https://i.redd.it/kph20n7kurmz.png', 1312, 100, 'image', 2561, 0, 2561, NULL, 'approved', '2017-09-19T05:00:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1351, 'Physics machine broke', 'https://i.redd.it/bfv0bb7o6psz.jpg', 1164, 100, 'image', 2558, 0, 2558, NULL, 'approved', '2017-10-19T02:26:46.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1352, 'Proof nazis are gay', 'https://i.redd.it/9kp6jux3dlnz.jpg', 1313, 100, 'image', 2557, 0, 2557, NULL, 'approved', '2017-09-23T08:15:03.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1353, 'Well said, sonic', 'https://i.redd.it/g6cyrd02nv501.png', 1314, 101, 'image', 2555, 0, 2555, NULL, 'approved', '2017-12-24T14:03:03.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1354, 'Trying to read a title on r/dankmemes', 'https://i.redd.it/8ofikovl7n8z.jpg', 1315, 101, 'image', 2555, 0, 2555, NULL, 'approved', '2017-07-09T22:25:48.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1355, 'Nice try, Satan.', 'https://i.redd.it/dwranr64g8pz.jpg', 1046, 101, 'image', 2552, 0, 2552, NULL, 'approved', '2017-10-01T14:57:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1356, 'Baljeet isn’t the bad guy here!!', 'https://i.redd.it/ygalke3s8i301.jpg', 1316, 100, 'image', 2550, 0, 2550, NULL, 'approved', '2017-12-12T14:51:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1357, 'Fuck EA amirite', 'https://i.redd.it/q84357za24yz.jpg', 1317, 101, 'image', 2548, 0, 2548, NULL, 'approved', '2017-11-15T09:49:41.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1358, '"He protec" lmao XD', 'https://i.redd.it/mg365mp31g9z.png', 1129, 100, 'image', 2546, 0, 2546, NULL, 'approved', '2017-07-13T23:21:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1359, 'ISIS left this behind', 'https://i.imgur.com/Xrlc5fD.jpg', 1097, 100, 'image', 2545, 0, 2545, NULL, 'approved', '2017-05-26T12:09:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1360, 'Can we go deeper?', 'https://i.redd.it/2sejiewcpv801.jpg', 1318, 101, 'image', 2543, 0, 2543, NULL, 'approved', '2018-01-08T17:28:20.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1361, 'War. War Ne🅱er Changes.', 'https://i.redd.it/afb753eibf2z.png', 1319, 101, 'image', 2540, 0, 2540, NULL, 'approved', '2017-06-08T13:44:01.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1362, 'Invasion alert!!!1!1!1!11', 'https://i.redd.it/yv15fknez8m01.png', 1320, 101, 'image', 2538, 0, 2538, NULL, 'approved', '2018-03-17T04:01:52.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1363, '{Insert emoji of choice here}', 'https://i.redd.it/9q0fipz7qpyz.jpg', 1321, 100, 'image', 2534, 0, 2534, NULL, 'approved', '2017-11-18T10:41:09.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1364, 'tyrone don''t like being called names', 'https://i.redd.it/93z0s91h11g01.png', 1322, 101, 'image', 2531, 0, 2531, NULL, 'approved', '2018-02-13T18:55:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1365, 'WHY TF?', 'https://i.redd.it/nsjmhxkfpxvy.jpg', 1323, 101, 'image', 2531, 0, 2531, NULL, 'approved', '2017-05-06T19:49:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1366, 'teehee', 'https://i.redd.it/oazgmgsgth8z.jpg', 1324, 101, 'image', 2527, 0, 2527, NULL, 'approved', '2017-07-09T04:17:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1367, 'It all makes sense now 🤔', 'https://i.redd.it/f9b6jpqcqb301.jpg', 1325, 100, 'image', 2526, 0, 2526, NULL, 'approved', '2017-12-11T16:57:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1368, 'The spookiest of bois', 'https://i.redd.it/jdnl75wma5rz.png', 1326, 101, 'image', 2524, 0, 2524, NULL, 'approved', '2017-10-11T06:29:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1369, 'Such an interesting nation...', 'https://i.redd.it/zzphmpw0c0r01.jpg', 1289, 101, 'image', 2521, 0, 2521, NULL, 'approved', '2018-04-10T04:17:18.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1370, 'Teddy C. doesn''t care', 'https://i.redd.it/e1kd0ny2u0mz.jpg', 1327, 100, 'image', 2515, 0, 2515, NULL, 'approved', '2017-09-15T10:08:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1371, 'plzzz babe', 'https://i.imgur.com/OERHS9H.jpg', 1125, 100, 'image', 2511, 0, 2511, NULL, 'approved', '2017-12-28T23:41:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1372, 'Wise words', 'https://i.redd.it/0mn8txppwlc01.jpg', 1056, 101, 'image', 2510, 0, 2510, NULL, 'approved', '2018-01-27T12:48:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1373, 'Girls don’t even know what they want', 'https://i.redd.it/bm52auk1k8e01.jpg', 1328, 100, 'image', 2509, 0, 2509, NULL, 'approved', '2018-02-04T18:02:22.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1374, 'Keep Stefan Alive', 'https://pbs.twimg.com/media/DHJTAfdUwAAUhqS.jpg', 1329, 100, 'image', 2509, 0, 2509, NULL, 'approved', '2017-08-15T05:11:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1375, 'The south shall 🅱️ise again', 'https://i.redd.it/8aesn0e7pwgz.jpg', 1330, 101, 'image', 2508, 0, 2508, NULL, 'approved', '2017-08-20T14:53:34.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1376, 'He took one for the team', 'https://i.redd.it/zml93rjw2kl01.png', 1331, 100, 'image', 2508, 0, 2508, NULL, 'approved', '2018-03-13T16:16:56.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1377, 'Something Something Darthvader', 'https://i.redd.it/g96grnp93xyz.jpg', 1332, 100, 'image', 2506, 0, 2506, NULL, 'approved', '2017-11-19T11:26:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1378, 'Help', 'https://i.redd.it/65d46phvphmz.jpg', 1333, 100, 'image', 2503, 0, 2503, NULL, 'approved', '2017-09-17T18:56:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1379, 'happy 4/20', 'https://i.redd.it/3m5gnr0u8osy.png', 1334, 100, 'image', 2501, 0, 2501, NULL, 'approved', '2017-04-20T08:48:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1380, 'IT''S 🅱️ACK!', 'https://i.redd.it/hicuhiia5fsz.jpg', 1335, 101, 'image', 2497, 0, 2497, NULL, 'approved', '2017-10-17T16:41:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1381, 'And stay up late', 'https://i.redd.it/5p54g6yap22z.jpg', 1336, 100, 'image', 2497, 0, 2497, NULL, 'approved', '2017-06-06T19:05:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1382, 'No net neutrality = No Spooky Memes = No more Spooky Bois', 'https://i.redd.it/5220508epzzz.jpg', 1337, 101, 'image', 2493, 0, 2493, NULL, 'approved', '2017-11-24T21:19:25.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1383, 'Stranger Things Season 10 looking good', 'https://i.redd.it/y13v5loxmr501.jpg', 1338, 101, 'image', 2487, 0, 2487, NULL, 'approved', '2017-12-24T00:35:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1384, 'I already turned it on and off', 'https://i.redd.it/vxs511jo3xc01.jpg', 1339, 100, 'image', 2483, 0, 2483, NULL, 'approved', '2018-01-29T02:26:56.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1385, 'Transcended the pros', 'https://i.imgur.com/7qOOiPZ.jpg', 1340, 101, 'image', 2481, 0, 2481, NULL, 'approved', '2017-11-28T09:39:22.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1386, '🅱moji Movie is best picture of 2017', 'https://i.redd.it/ulpx9em8zrcz.jpg', 1341, 101, 'image', 2475, 0, 2475, NULL, 'approved', '2017-07-30T18:44:19.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1387, 'meanwhile on steam', 'https://i.redd.it/r0rb2zictn7z.jpg', 1342, 101, 'image', 2468, 0, 2468, NULL, 'approved', '2017-07-04T23:24:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1388, 'No one fucking cares.', 'https://i.redd.it/kvifpuohrwm01.jpg', 1343, 101, 'image', 2466, 0, 2466, NULL, 'approved', '2018-03-20T12:01:31.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1389, 'And so it begins u/Shrekhya', 'https://i.redd.it/8946iqcxuwj01.jpg', 1344, 101, 'image', 2467, 0, 2467, NULL, 'approved', '2018-03-05T09:06:50.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1390, 'Welcome to the real world.', 'https://i.redd.it/d5xu7s9s18001.jpg', 1345, 100, 'image', 2461, 0, 2461, NULL, 'approved', '2017-11-26T01:22:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1391, 'Space XXX', 'https://i.redd.it/4pzxwd8zk3jy.jpg', 1346, 100, 'image', 2459, 0, 2459, NULL, 'approved', '2017-03-03T01:59:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1392, 'Show your support', 'https://i.redd.it/m7no3so0pf7z.jpg', 1347, 100, 'image', 2453, 0, 2453, NULL, 'approved', '2017-07-03T20:04:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1393, 'slobodan fieri', 'https://i.redd.it/fx5h810u0z101.jpg', 1348, 100, 'image', 2453, 0, 2453, NULL, 'approved', '2017-12-04T21:10:05.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1394, 'Make Daddy Marx proud', 'https://i.redd.it/60k3kokrkdvz.jpg', 1349, 100, 'image', 2446, 0, 2446, NULL, 'approved', '2017-11-02T18:21:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1395, 'Irma makes me F I R M A', 'https://i.redd.it/h3astvd3s8kz.png', 1350, 100, 'image', 2443, 0, 2443, NULL, 'approved', '2017-09-06T10:43:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1396, 'serious shit', 'https://i.redd.it/111morocmjaz.jpg', 1351, 100, 'image', 2441, 0, 2441, NULL, 'approved', '2017-07-19T12:31:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1397, 'The prophecy has been fulfilled', 'https://i.redd.it/jo1bs8w3trp01.jpg', 1352, 100, 'image', 2438, 0, 2438, NULL, 'approved', '2018-04-03T22:32:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1398, 'So Annoying', 'https://i.redd.it/jijayb6pg7g01.jpg', 1353, 100, 'image', 2437, 0, 2437, NULL, 'approved', '2018-02-14T16:30:21.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1399, 'The fastest hand in the West', 'https://i.redd.it/x1mml7ck0i001.jpg', 1354, 100, 'image', 2435, 0, 2435, NULL, 'approved', '2017-11-27T10:53:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1400, 'Hang in there Stefán, we all love you ❤️🙌', 'https://i.redd.it/77g7pu1ly56z.jpg', 1355, 100, 'image', 2436, 0, 2436, NULL, 'approved', '2017-06-27T10:16:39.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1401, '🅱️eat its 🅰️ss', 'https://i.redd.it/nn3i836tae6z.jpg', 1356, 101, 'image', 2435, 0, 2435, NULL, 'approved', '2017-06-28T14:19:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1402, 'frick', 'https://i.redd.it/ucm8o2tcciwy.png', 1357, 100, 'image', 2434, 0, 2434, NULL, 'approved', '2017-05-09T17:15:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1403, 'Luke calling the force lesbian lol', 'https://i.redd.it/faj5q3r5c3m01.jpg', 1358, 101, 'image', 2431, 0, 2431, NULL, 'approved', '2018-03-16T09:02:21.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1404, 'RIP Beatles 😭', 'https://i.redd.it/tv3wryo71jq01.jpg', 1359, 101, 'image', 2429, 0, 2429, NULL, 'approved', '2018-04-07T18:06:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1405, 'Bravo comrade!', 'https://i.imgur.com/ZkkIvaA.jpg', 1360, 101, 'image', 2427, 0, 2427, NULL, 'approved', '2018-02-05T10:29:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1406, 'Democrats right now', 'http://i.imgur.com/trS2xCh.png', 1361, 101, 'image', 2426, 0, 2426, NULL, 'approved', '2016-11-09T04:19:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1407, 'We all know it''s true', 'https://i.redd.it/eo3349iqnf001.jpg', 1362, 101, 'image', 2426, 0, 2426, NULL, 'approved', '2017-11-27T02:57:40.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1408, '🅱icasso', 'https://i.redd.it/a61ptdhm8cty.jpg', 1363, 101, 'image', 2416, 0, 2416, NULL, 'approved', '2017-04-23T17:30:48.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1409, 'What if the baby''s dead', 'https://i.redd.it/g5celtlt6jo01.jpg', 1364, 101, 'image', 2415, 0, 2415, NULL, 'approved', '2018-03-28T16:29:14.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1410, 'Damn it siri', 'https://i.redd.it/bppdyqyhox601.png', 1173, 100, 'image', 2414, 0, 2414, NULL, 'approved', '2017-12-29T21:58:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1411, 'Our 🅱ony', 'https://i.redd.it/xfv46ydnrtnz.jpg', 1365, 100, 'image', 2413, 0, 2413, NULL, 'approved', '2017-09-24T12:30:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1412, 'Tough question', 'https://i.imgur.com/PXjCZGM.jpg', 1366, 100, 'image', 2407, 0, 2407, NULL, 'approved', '2017-11-30T14:39:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1413, 'Leaked image from a top secret government facility. Incriminating evidence', 'https://i.redd.it/q5hvxap284j01.jpg', 1367, 100, 'image', 2400, 0, 2400, NULL, 'approved', '2018-03-01T08:48:51.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1414, 'Hidden 🕵️‍♀️', 'https://i.redd.it/m6i0y5zl8uf01.jpg', 1368, 100, 'image', 2394, 0, 2394, NULL, 'approved', '2018-02-12T20:01:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1415, 'Stronger together', 'https://i.redd.it/o4237xnmw8cy.jpg', 1369, 100, 'image', 2385, 0, 2385, NULL, 'approved', '2017-01-27T12:07:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1416, 'Is the hand sanitizer thing still relevant?', 'https://i.redd.it/vl5w11we2kq01.jpg', 1370, 101, 'image', 2385, 0, 2385, NULL, 'approved', '2018-04-07T21:34:43.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1417, 'Covfefe', 'http://i.imgur.com/DC77VA6.jpg', 1371, 100, 'image', 2382, 0, 2382, NULL, 'approved', '2017-05-31T08:32:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1418, 'June 22 to July 22', 'https://i.imgur.com/RZ4xwGt.jpg', 1372, 100, 'image', 2379, 0, 2379, NULL, 'approved', '2017-11-13T16:37:23.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1419, 'Scientists Are Still 🅱️affled 🤔', 'http://imgur.com/mOXpzID.jpg', 1373, 101, 'image', 2376, 0, 2376, NULL, 'approved', '2017-06-21T04:55:07.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1420, 'rage quit', 'https://i.redd.it/u07l2bn8o9201.jpg', 1348, 100, 'image', 2367, 0, 2367, NULL, 'approved', '2017-12-06T08:58:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1421, '2020: We elected Kanye so we''d have history''s thiccest First Lady', 'https://i.redd.it/zuat31e0hbhz.jpg', 1374, 100, 'image', 2366, 0, 2366, NULL, 'approved', '2017-08-22T16:34:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1422, 'it''s in my 🅱lood 🔥🔥🔥', 'https://i.redd.it/2g82g9x77ipy.jpg', 1375, 101, 'image', 2363, 0, 2363, NULL, 'approved', '2017-04-04T09:17:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1423, 'Literally the same shit', 'https://i.redd.it/711etzjtvjgz.png', 1003, 100, 'image', 2350, 0, 2350, NULL, 'approved', '2017-08-18T19:47:30.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1424, 'Indeed', 'https://i.redd.it/d2yk970694g01.jpg', 1376, 100, 'image', 2348, 0, 2348, NULL, 'approved', '2018-02-14T05:42:34.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1425, 'Y''all better remember it 😤😤', 'https://i.redd.it/y2az5n6cs8sz.jpg', 1377, 100, 'image', 2348, 0, 2348, NULL, 'approved', '2017-10-16T19:17:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1426, '🔥 LEAKED RESULTS OF TONIGHT''S ELECTION! 🔥', 'http://i.imgur.com/UYXRlNI.png', 1378, 100, 'image', 2347, 0, 2347, NULL, 'approved', '2016-11-08T14:25:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1427, 'It’s all for a noble cause', 'https://i.imgur.com/LaLdf0p.jpg', 1379, 101, 'image', 2344, 0, 2344, NULL, 'approved', '2018-02-24T17:13:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1428, 'Fuck you Shit Pie', 'https://i.redd.it/0104yuag94001.jpg', 1380, 100, 'image', 2341, 0, 2341, NULL, 'approved', '2017-11-25T12:38:12.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1429, 'It all makes sense...', 'https://i.redd.it/nqwk4n946id01.jpg', 1381, 101, 'image', 2339, 0, 2339, NULL, 'approved', '2018-02-01T01:18:00.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1430, 'Who would win???🤔', 'https://i.redd.it/ag34tibd3zkz.png', 1382, 100, 'image', 2337, 0, 2337, NULL, 'approved', '2017-09-10T03:13:53.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1431, 'Start your new year with a tunak', 'https://vgy.me/Xuodwz.jpg', 1383, 100, 'image', 2331, 0, 2331, NULL, 'approved', '2017-12-19T07:27:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1432, 'This had to be done', 'http://i.imgur.com/RZL9ob2.png', 1384, 100, 'image', 2329, 0, 2329, NULL, 'approved', '2017-06-25T18:28:35.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1433, 'Lucky', 'https://i.imgur.com/ghRlFol.jpg', 1385, 101, 'image', 2328, 0, 2328, NULL, 'approved', '2017-06-04T10:46:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1434, 'Happy Holidays!', 'https://i.redd.it/2ts4q3ovkjfz.jpg', 1233, 100, 'image', 2325, 0, 2325, NULL, 'approved', '2017-08-13T17:41:57.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1435, 'About time', 'https://i.redd.it/h2uqrtn2z3a01.jpg', 1187, 101, 'image', 2323, 0, 2323, NULL, 'approved', '2018-01-14T22:21:11.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1436, 'Stay woke', 'https://i.redd.it/8n45be1pt9uy.jpg', 1386, 100, 'image', 2322, 0, 2322, NULL, 'approved', '2017-04-28T10:26:45.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1437, '🅱️ooty', 'https://i.redd.it/1hs7oy8a5bgz.jpg', 1387, 101, 'image', 2320, 0, 2320, NULL, 'approved', '2017-08-17T14:24:34.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1438, 'sTaLiN wAsNt ReAl', 'https://i.redd.it/wcwph95vw0yy.jpg', 1388, 100, 'image', 2317, 0, 2317, NULL, 'approved', '2017-05-17T08:45:07.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1439, 'They’re asking for it', 'https://i.redd.it/mqsp8e589c701.jpg', 1389, 100, 'image', 2316, 0, 2316, NULL, 'approved', '2017-12-31T22:59:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1440, 'nON-aGGresSion pAcT', 'https://i.redd.it/i2rntin1h4xy.jpg', 1390, 101, 'image', 2314, 0, 2314, NULL, 'approved', '2017-05-12T19:39:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1441, '🅱️uicidal', 'https://i.redd.it/5y1sl5at0srz.jpg', 1391, 100, 'image', 2313, 0, 2313, NULL, 'approved', '2017-10-14T10:55:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1442, 'Really makes you 🅱️hink 🤔', 'https://i.redd.it/hgznmvqjbruz.png', 1188, 100, 'image', 2312, 0, 2312, NULL, 'approved', '2017-10-29T11:47:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1443, 'big if true 👀', 'https://i.redd.it/n3caahyei8f01.png', 1392, 100, 'image', 2311, 0, 2311, NULL, 'approved', '2018-02-09T18:58:10.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1444, '🅱ood 🅱uy', 'http://i.imgur.com/48FvSIQ.jpg', 1393, 100, 'image', 2303, 0, 2303, NULL, 'approved', '2017-04-24T08:14:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1445, '🅱ducate Thyself', 'https://i.redd.it/kkudam1w47pz.jpg', 1013, 101, 'image', 2300, 0, 2300, NULL, 'approved', '2017-10-01T10:32:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1446, 'clearly, japan has better things to do', 'https://i.redd.it/z4mneosyt2p01.jpg', 1394, 100, 'image', 2295, 0, 2295, NULL, 'approved', '2018-03-31T10:33:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1447, 'When you get approved as a moderator for r/dankmemes', 'https://i.redd.it/xum8gvi3acly.png', 1395, 101, 'image', 2296, 0, 2296, NULL, 'approved', '2017-03-14T09:05:21.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1448, 'Oh shit', 'https://i.redd.it/wgtkvxb88wez.png', 1166, 100, 'image', 2293, 0, 2293, NULL, 'approved', '2017-08-10T11:10:16.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1449, '🅱️ee Mo🅱️ie', 'https://i.imgur.com/yVmhPRf.jpg', 1201, 101, 'image', 2291, 0, 2291, NULL, 'approved', '2017-10-28T07:22:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1450, 'Joining the Spooky 🅱️ois', 'https://i.redd.it/8g9and732rqz.jpg', 1396, 100, 'image', 2290, 0, 2290, NULL, 'approved', '2017-10-09T06:36:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1451, 'Last Cold One', 'https://i.imgur.com/mFZSSO3.jpg', 1397, 100, 'image', 2287, 0, 2287, NULL, 'approved', '2017-12-02T12:34:08.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1452, 'DANK', 'https://i.redd.it/ytmlrqt6ecpy.jpg', 1398, 100, 'image', 2283, 0, 2283, NULL, 'approved', '2017-04-03T13:44:49.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1453, 'Doing good deeds', 'https://i.redd.it/t7hlxwkncao01.jpg', 1015, 101, 'image', 2282, 0, 2282, NULL, 'approved', '2018-03-27T10:45:53.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1454, '🅱️ u t', 'https://i.redd.it/hjwd5ewp4t9z.jpg', 1399, 101, 'image', 2279, 0, 2279, NULL, 'approved', '2017-07-15T19:24:25.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1455, 'Good ol'' Buzzfeed.', 'https://i.imgur.com/k8Gq9e3.jpg', 1400, 101, 'image', 2278, 0, 2278, NULL, 'approved', '2018-03-04T14:10:37.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1456, 'Tank the rewind', 'https://i.imgur.com/DisC9Yq.png', 1401, 100, 'image', 2279, 0, 2279, NULL, 'approved', '2017-12-09T13:00:19.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1457, 'It''s so inspiring 😍😍', 'https://i.redd.it/ii4bmbj4q5g01.jpg', 1402, 100, 'image', 2274, 0, 2274, NULL, 'approved', '2018-02-14T10:39:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1458, 'sp00k time is here', 'https://i.redd.it/0de2gff47hpz.jpg', 1403, 100, 'image', 2270, 0, 2270, NULL, 'approved', '2017-10-02T20:22:38.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1459, 'Had to reupload because I don''t understand dankmemes'' rules', 'https://i.redd.it/6uf6v56r45q01.png', 1404, 101, 'image', 2268, 0, 2268, NULL, 'approved', '2018-04-05T19:21:34.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1460, '🅱-16', 'https://i.redd.it/1flm6cajp95z.jpg', 1405, 100, 'image', 2267, 0, 2267, NULL, 'approved', '2017-06-22T21:48:57.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1461, 'amaz', 'https://i.redd.it/5d228o0q1jpy.jpg', 1406, 101, 'image', 2266, 0, 2266, NULL, 'approved', '2017-04-04T12:07:06.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1462, '🅱️eme war', 'https://i.redd.it/kleiflmad78z.jpg', 1407, 100, 'image', 2265, 0, 2265, NULL, 'approved', '2017-07-07T17:09:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1463, 'Press F to pay respecc', 'https://i.redd.it/ukaf15makyo01.jpg', 1408, 101, 'image', 2264, 0, 2264, NULL, 'approved', '2018-03-30T20:11:36.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1464, 'Respect a fallen soldier', 'https://i.redd.it/0qf5tosv45701.png', 1409, 101, 'image', 2259, 0, 2259, NULL, 'approved', '2017-12-30T23:04:25.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1465, 'Tru story', 'https://i.redd.it/37ol5f2ajp001.jpg', 1410, 100, 'image', 2255, 0, 2255, NULL, 'approved', '2017-11-28T12:10:30.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1466, '🅱ADDY OF 🅱IVE', 'https://i.redd.it/rsfichsjuuwy.jpg', 1411, 100, 'image', 2250, 0, 2250, NULL, 'approved', '2017-05-11T11:17:13.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1467, 'WTH', 'https://i.imgur.com/xKeMyyp.jpg', 1097, 100, 'image', 2249, 0, 2249, NULL, 'approved', '2017-05-24T10:05:34.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1468, 'Destroy them with tasers', 'https://i.redd.it/510fc4wdwpf01.jpg', 1301, 100, 'image', 2247, 0, 2247, NULL, 'approved', '2018-02-12T05:25:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1469, 'True heart break', 'https://i.redd.it/2otr6s9ugbl01.jpg', 1103, 100, 'image', 2243, 0, 2243, NULL, 'approved', '2018-03-12T11:18:42.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1470, 'Click🅱️ait', 'https://i.redd.it/4k28svvnn2nz.jpg', 1412, 101, 'image', 2242, 0, 2242, NULL, 'approved', '2017-09-20T17:20:58.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1471, 'Nibba bout to get toasted', 'https://i.redd.it/nwd5y96ea3301.jpg', 1413, 100, 'image', 2235, 0, 2235, NULL, 'approved', '2017-12-10T12:33:54.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1472, 'S🅱eech', 'https://i.redd.it/dmu14cugie4z.jpg', 1414, 100, 'image', 2234, 0, 2234, NULL, 'approved', '2017-06-18T12:54:03.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1473, 'Wendy''s knows what''s up', 'https://i.redd.it/36jfqo2hz68y.jpg', 1415, 101, 'image', 2234, 0, 2234, NULL, 'approved', '2017-01-07T01:23:04.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1474, 'Not a professional but you know the rules sir', 'https://i.redd.it/sv3givfub6j01.jpg', 1025, 101, 'image', 2230, 0, 2230, NULL, 'approved', '2018-03-01T15:53:32.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1475, 'Traps aren''t 🙄😜💦✌🏻gay', 'https://i.redd.it/t89kh7unzzlz.jpg', 1416, 100, 'image', 2228, 0, 2228, NULL, 'approved', '2017-09-15T07:18:07.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1476, 'There’s 2, there’s 4, there’s... KA-BOOM!', 'https://i.redd.it/6qbljulr00c01.jpg', 1417, 100, 'image', 2220, 0, 2220, NULL, 'approved', '2018-01-24T11:11:48.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1477, 'It is known', 'https://i.redd.it/xux98l0d71d01.jpg', 1418, 101, 'image', 2220, 0, 2220, NULL, 'approved', '2018-01-29T16:14:41.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1478, 'Switzerlan🅱️ is my 🅱️ity', 'https://i.redd.it/75pbjfps2sgz.jpg', 1419, 100, 'image', 2220, 0, 2220, NULL, 'approved', '2017-08-19T23:22:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1479, 'Who said anything about, floating?', 'https://i.redd.it/3mv13iuag3jz.jpg', 1420, 101, 'image', 2220, 0, 2220, NULL, 'approved', '2017-08-31T15:44:21.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1480, 'He didn''t', 'https://i.redd.it/5vlkmrsr9k4z.jpg', 1421, 101, 'image', 2218, 0, 2218, NULL, 'approved', '2017-06-19T08:16:02.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1481, 'Thanks Obama', 'https://i.redd.it/n29cki4wbeo01.jpg', 1422, 101, 'image', 2218, 0, 2218, NULL, 'approved', '2018-03-28T00:09:28.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1482, 'Pride 🏳️‍🌈 + Accomplishment 🏆', 'https://i.redd.it/3usiqg8amdyz.jpg', 1103, 100, 'image', 2218, 0, 2218, NULL, 'approved', '2017-11-16T17:57:44.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1483, 'D A B 🔥', 'https://i.redd.it/plwrejyx4o3z.jpg', 1423, 100, 'image', 2203, 0, 2203, NULL, 'approved', '2017-06-14T20:12:26.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1484, 'WWTCD', 'https://i.redd.it/3jhtx3kxp8mz.jpg', 1424, 100, 'image', 2203, 0, 2203, NULL, 'approved', '2017-09-16T12:40:49.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1485, 'Nintendoes What Others Don''t', 'https://i.redd.it/32ekwzw6xwmz.jpg', 1425, 100, 'image', 2201, 0, 2201, NULL, 'approved', '2017-09-19T22:03:17.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1486, 'Fuego', 'https://i.redd.it/j0574je6zu0z.jpg', 1426, 100, 'image', 2200, 0, 2200, NULL, 'approved', '2017-05-31T15:59:41.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1487, 'Dont tell the FBI', 'https://i.redd.it/rlc349mykx201.jpg', 1427, 101, 'image', 2200, 0, 2200, NULL, 'approved', '2017-12-09T17:26:33.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1488, 'N❗🅱️🅱️🅰️$ ☻', 'https://i.redd.it/ofzts9pg5mbz.jpg', 1074, 101, 'image', 2198, 0, 2198, NULL, 'approved', '2017-07-24T22:04:21.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1489, 'N😡T ON MY WATCH', 'https://i.redd.it/v7bs70avdtm01.jpg', 1090, 100, 'image', 2197, 0, 2197, NULL, 'approved', '2018-03-20T00:39:52.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1490, 'Severe lapse of judgement', 'https://i.redd.it/o037iln10fi01.png', 1115, 101, 'image', 2197, 0, 2197, NULL, 'approved', '2018-02-25T20:04:24.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1491, 'Please dont', 'https://i.redd.it/qy4qw1c6olq01.jpg', 1049, 101, 'image', 2193, 0, 2193, NULL, 'approved', '2018-04-08T02:59:56.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1492, 'S🅱iderman', 'https://i.redd.it/o2s34jb3pdkz.jpg', 1250, 101, 'image', 2187, 0, 2187, NULL, 'approved', '2017-09-07T03:15:55.000Z', NOW());
INSERT INTO posts (id, title, image_url, author_id, community_id, type, upvotes, downvotes, score, tags, moderation_status, created_at, updated_at) 
VALUES (1493, 'All the other kids with the pumped up kicks', 'https://i.redd.it/oyiivwpo24ry.jpg', 1428, 100, 'image', 2183, 0, 2183, NULL, 'approved', '2017-04-12T11:54:24.000Z', NOW());

-- 4. AI Moderation Logs

-- 5. Comments
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1001, 1001, 1090, 'Lmao so true!', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1002, 1001, 1159, 'I feel personally attacked by this.', 52, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1003, 1002, 1090, 'The quality we deserve.', 83, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1004, 1002, 1296, 'Modern art.', 92, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1005, 1003, 1216, 'The quality we deserve.', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1006, 1003, 1183, 'Relatable af.', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1007, 1004, 1035, 'Wait, is this OC?', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1008, 1004, 1182, 'Dead. 💀', 39, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1009, 1004, 1255, 'Who made this? 😂', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1010, 1005, 1218, 'I feel personally attacked by this.', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1011, 1005, 1304, 'Modern art.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1012, 1005, 1310, 'I feel personally attacked by this.', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1013, 1006, 1328, 'Modern art.', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1014, 1007, 1090, 'Dead. 💀', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1015, 1007, 1380, 'Modern art.', 74, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1016, 1007, 1233, 'I''m in this picture and I don''t like it.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1017, 1008, 1406, 'This is why I love the internet.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1018, 1008, 1024, 'The quality we deserve.', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1019, 1008, 1229, 'Relatable af.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1020, 1009, 1345, 'Lmao so true!', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1021, 1010, 1308, 'I''ve seen this one before, but it''s still gold.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1022, 1010, 1344, 'Imagine explaining this to someone from the 1800s.', 12, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1023, 1010, 1396, 'Who made this? 😂', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1024, 1011, 1253, 'I feel personally attacked by this.', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1025, 1012, 1086, 'Dead. 💀', 35, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1026, 1013, 1420, 'Dead. 💀', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1027, 1013, 1189, 'Wait, is this OC?', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1028, 1014, 1371, 'Top tier meme.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1029, 1014, 1375, 'The quality we deserve.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1030, 1014, 1016, 'This is why I love the internet.', 65, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1031, 1015, 1302, 'Wait, is this OC?', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1032, 1015, 1364, 'Who made this? 😂', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1033, 1016, 1217, 'I''ve seen this one before, but it''s still gold.', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1034, 1016, 1062, 'Who made this? 😂', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1035, 1017, 1225, 'Imagine explaining this to someone from the 1800s.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1036, 1018, 1246, 'I feel personally attacked by this.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1037, 1019, 1147, 'Top tier meme.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1038, 1020, 1281, 'I feel personally attacked by this.', 74, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1039, 1020, 1305, 'Wait, is this OC?', 62, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1040, 1020, 1295, 'Imagine explaining this to someone from the 1800s.', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1041, 1021, 1051, 'Relatable af.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1042, 1021, 1005, 'Lmao so true!', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1043, 1021, 1243, 'Dead. 💀', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1044, 1022, 1144, 'Sending this to my group chat right now.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1045, 1023, 1397, 'This is why I love the internet.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1046, 1023, 1234, 'Sending this to my group chat right now.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1047, 1024, 1125, 'The quality we deserve.', 69, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1048, 1024, 1251, 'Sending this to my group chat right now.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1049, 1025, 1052, 'Top tier meme.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1050, 1025, 1028, 'Modern art.', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1051, 1025, 1195, 'Who made this? 😂', 4, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1052, 1026, 1270, 'I''m in this picture and I don''t like it.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1053, 1026, 1160, 'Lmao so true!', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1054, 1026, 1312, 'Dead. 💀', 69, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1055, 1027, 1425, 'Dead. 💀', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1056, 1027, 1001, 'Sending this to my group chat right now.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1057, 1027, 1322, 'Imagine explaining this to someone from the 1800s.', 65, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1058, 1028, 1323, 'I''ve seen this one before, but it''s still gold.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1059, 1028, 1280, 'Modern art.', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1060, 1029, 1036, 'This is why I love the internet.', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1061, 1030, 1397, 'Dead. 💀', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1062, 1030, 1237, 'Sending this to my group chat right now.', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1063, 1030, 1276, 'Imagine explaining this to someone from the 1800s.', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1064, 1031, 1020, 'I''m in this picture and I don''t like it.', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1065, 1031, 1411, 'I''m in this picture and I don''t like it.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1066, 1031, 1372, 'Relatable af.', 7, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1067, 1032, 1234, 'Sending this to my group chat right now.', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1068, 1032, 1284, 'Sending this to my group chat right now.', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1069, 1032, 1104, 'Top tier meme.', 28, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1070, 1033, 1143, 'Who made this? 😂', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1071, 1033, 1212, 'I''ve seen this one before, but it''s still gold.', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1072, 1034, 1043, 'The quality we deserve.', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1073, 1034, 1156, 'Lmao so true!', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1074, 1035, 1097, 'Wait, is this OC?', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1075, 1036, 1034, 'The quality we deserve.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1076, 1036, 1212, 'Modern art.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1077, 1037, 1109, 'The quality we deserve.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1078, 1038, 1155, 'Sending this to my group chat right now.', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1079, 1038, 1224, 'Who made this? 😂', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1080, 1039, 1425, 'I feel personally attacked by this.', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1081, 1039, 1125, 'Relatable af.', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1082, 1039, 1299, 'Top tier meme.', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1083, 1040, 1344, 'Relatable af.', 5, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1084, 1040, 1314, 'Sending this to my group chat right now.', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1085, 1040, 1029, 'Dead. 💀', 21, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1086, 1041, 1125, 'I''ve seen this one before, but it''s still gold.', 7, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1087, 1041, 1096, 'Dead. 💀', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1088, 1041, 1306, 'I feel personally attacked by this.', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1089, 1042, 1320, 'The quality we deserve.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1090, 1043, 1099, 'Relatable af.', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1091, 1044, 1099, 'I''ve seen this one before, but it''s still gold.', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1092, 1045, 1407, 'I''ve seen this one before, but it''s still gold.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1093, 1046, 1039, 'The quality we deserve.', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1094, 1047, 1325, 'Imagine explaining this to someone from the 1800s.', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1095, 1048, 1170, 'Lmao so true!', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1096, 1049, 1259, 'This is why I love the internet.', 86, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1097, 1049, 1332, 'Who made this? 😂', 52, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1098, 1049, 1023, 'Wait, is this OC?', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1099, 1050, 1017, 'Dead. 💀', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1100, 1050, 1211, 'This is why I love the internet.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1101, 1050, 1109, 'Sending this to my group chat right now.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1102, 1051, 1361, 'Who made this? 😂', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1103, 1051, 1124, 'Lmao so true!', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1104, 1051, 1157, 'Modern art.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1105, 1052, 1412, 'Relatable af.', 35, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1106, 1052, 1107, 'Modern art.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1107, 1052, 1081, 'Who made this? 😂', 92, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1108, 1053, 1338, 'Sending this to my group chat right now.', 74, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1109, 1053, 1062, 'I''m in this picture and I don''t like it.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1110, 1053, 1101, 'Modern art.', 79, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1111, 1054, 1404, 'I''ve seen this one before, but it''s still gold.', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1112, 1054, 1051, 'I''ve seen this one before, but it''s still gold.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1113, 1054, 1284, 'I''ve seen this one before, but it''s still gold.', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1114, 1055, 1226, 'The quality we deserve.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1115, 1055, 1370, 'Relatable af.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1116, 1055, 1252, 'Top tier meme.', 62, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1117, 1056, 1192, 'This is why I love the internet.', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1118, 1057, 1294, 'Top tier meme.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1119, 1058, 1184, 'This is why I love the internet.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1120, 1058, 1259, 'Who made this? 😂', 74, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1121, 1058, 1357, 'Dead. 💀', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1122, 1059, 1314, 'Dead. 💀', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1123, 1060, 1228, 'This is why I love the internet.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1124, 1060, 1293, 'I''m in this picture and I don''t like it.', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1125, 1060, 1122, 'The quality we deserve.', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1126, 1061, 1065, 'Top tier meme.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1127, 1061, 1288, 'Top tier meme.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1128, 1061, 1371, 'I''ve seen this one before, but it''s still gold.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1129, 1062, 1127, 'Relatable af.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1130, 1063, 1218, 'Wait, is this OC?', 66, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1131, 1063, 1184, 'Lmao so true!', 97, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1132, 1063, 1269, 'Top tier meme.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1133, 1064, 1284, 'Relatable af.', 19, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1134, 1064, 1125, 'This is why I love the internet.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1135, 1064, 1142, 'Imagine explaining this to someone from the 1800s.', 97, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1136, 1065, 1061, 'Top tier meme.', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1137, 1066, 1119, 'Relatable af.', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1138, 1066, 1302, 'I''m in this picture and I don''t like it.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1139, 1066, 1183, 'Dead. 💀', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1140, 1067, 1029, 'I''m in this picture and I don''t like it.', 31, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1141, 1067, 1263, 'Lmao so true!', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1142, 1068, 1169, 'Relatable af.', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1143, 1068, 1258, 'Top tier meme.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1144, 1068, 1403, 'Sending this to my group chat right now.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1145, 1069, 1383, 'I''ve seen this one before, but it''s still gold.', 66, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1146, 1069, 1362, 'Lmao so true!', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1147, 1070, 1308, 'Lmao so true!', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1148, 1070, 1112, 'Lmao so true!', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1149, 1071, 1008, 'Lmao so true!', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1150, 1071, 1218, 'Sending this to my group chat right now.', 22, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1151, 1072, 1203, 'I feel personally attacked by this.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1152, 1072, 1408, 'Who made this? 😂', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1153, 1072, 1308, 'Sending this to my group chat right now.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1154, 1073, 1133, 'I''m in this picture and I don''t like it.', 35, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1155, 1074, 1211, 'Top tier meme.', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1156, 1074, 1237, 'Wait, is this OC?', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1157, 1075, 1078, 'Relatable af.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1158, 1076, 1282, 'Lmao so true!', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1159, 1076, 1062, 'Lmao so true!', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1160, 1077, 1279, 'Wait, is this OC?', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1161, 1077, 1033, 'Top tier meme.', 47, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1162, 1077, 1331, 'I''ve seen this one before, but it''s still gold.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1163, 1078, 1331, 'Sending this to my group chat right now.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1164, 1078, 1371, 'Sending this to my group chat right now.', 20, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1165, 1078, 1351, 'Who made this? 😂', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1166, 1079, 1310, 'This is why I love the internet.', 56, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1167, 1079, 1162, 'This is why I love the internet.', 5, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1168, 1079, 1134, 'Imagine explaining this to someone from the 1800s.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1169, 1080, 1274, 'Relatable af.', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1170, 1080, 1401, 'Top tier meme.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1171, 1080, 1229, 'Sending this to my group chat right now.', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1172, 1081, 1150, 'I''m in this picture and I don''t like it.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1173, 1082, 1086, 'Lmao so true!', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1174, 1082, 1240, 'Dead. 💀', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1175, 1082, 1030, 'Sending this to my group chat right now.', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1176, 1083, 1222, 'Top tier meme.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1177, 1083, 1181, 'Who made this? 😂', 59, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1178, 1084, 1076, 'Imagine explaining this to someone from the 1800s.', 39, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1179, 1085, 1200, 'I''m in this picture and I don''t like it.', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1180, 1085, 1403, 'Sending this to my group chat right now.', 84, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1181, 1085, 1224, 'This is why I love the internet.', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1182, 1086, 1270, 'I feel personally attacked by this.', 53, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1183, 1087, 1160, 'Sending this to my group chat right now.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1184, 1087, 1118, 'I feel personally attacked by this.', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1185, 1087, 1095, 'Lmao so true!', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1186, 1088, 1261, 'I''ve seen this one before, but it''s still gold.', 92, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1187, 1088, 1176, 'The quality we deserve.', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1188, 1088, 1234, 'Who made this? 😂', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1189, 1089, 1281, 'Relatable af.', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1190, 1090, 1030, 'This is why I love the internet.', 20, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1191, 1091, 1123, 'Relatable af.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1192, 1092, 1072, 'Imagine explaining this to someone from the 1800s.', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1193, 1092, 1272, 'Imagine explaining this to someone from the 1800s.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1194, 1093, 1019, 'Wait, is this OC?', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1195, 1093, 1140, 'I''ve seen this one before, but it''s still gold.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1196, 1094, 1341, 'Wait, is this OC?', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1197, 1094, 1171, 'Imagine explaining this to someone from the 1800s.', 59, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1198, 1094, 1196, 'I feel personally attacked by this.', 20, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1199, 1095, 1029, 'Relatable af.', 83, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1200, 1096, 1034, 'I''ve seen this one before, but it''s still gold.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1201, 1096, 1380, 'Relatable af.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1202, 1096, 1098, 'I feel personally attacked by this.', 84, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1203, 1097, 1009, 'I feel personally attacked by this.', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1204, 1097, 1380, 'Sending this to my group chat right now.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1205, 1098, 1125, 'Imagine explaining this to someone from the 1800s.', 4, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1206, 1098, 1098, 'Relatable af.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1207, 1099, 1094, 'This is why I love the internet.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1208, 1100, 1225, 'Lmao so true!', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1209, 1101, 1403, 'The quality we deserve.', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1210, 1101, 1176, 'Wait, is this OC?', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1211, 1101, 1359, 'Who made this? 😂', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1212, 1102, 1317, 'I''ve seen this one before, but it''s still gold.', 83, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1213, 1103, 1271, 'Dead. 💀', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1214, 1104, 1259, 'I feel personally attacked by this.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1215, 1104, 1256, 'Who made this? 😂', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1216, 1105, 1184, 'Top tier meme.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1217, 1106, 1214, 'I feel personally attacked by this.', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1218, 1106, 1306, 'The quality we deserve.', 14, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1219, 1106, 1007, 'I''m in this picture and I don''t like it.', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1220, 1107, 1327, 'I feel personally attacked by this.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1221, 1107, 1148, 'Relatable af.', 39, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1222, 1108, 1074, 'I''ve seen this one before, but it''s still gold.', 52, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1223, 1109, 1324, 'Sending this to my group chat right now.', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1224, 1110, 1338, 'I''m in this picture and I don''t like it.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1225, 1110, 1382, 'Imagine explaining this to someone from the 1800s.', 56, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1226, 1110, 1291, 'I''m in this picture and I don''t like it.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1227, 1111, 1133, 'Modern art.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1228, 1111, 1359, 'Imagine explaining this to someone from the 1800s.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1229, 1112, 1031, 'Imagine explaining this to someone from the 1800s.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1230, 1112, 1258, 'This is why I love the internet.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1231, 1112, 1417, 'Who made this? 😂', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1232, 1113, 1132, 'I feel personally attacked by this.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1233, 1114, 1079, 'Lmao so true!', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1234, 1115, 1282, 'Lmao so true!', 82, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1235, 1115, 1054, 'I''m in this picture and I don''t like it.', 44, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1236, 1116, 1294, 'Wait, is this OC?', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1237, 1117, 1158, 'Top tier meme.', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1238, 1117, 1159, 'Modern art.', 79, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1239, 1117, 1101, 'Lmao so true!', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1240, 1118, 1255, 'Sending this to my group chat right now.', 53, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1241, 1119, 1023, 'Wait, is this OC?', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1242, 1119, 1340, 'Imagine explaining this to someone from the 1800s.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1243, 1119, 1083, 'Imagine explaining this to someone from the 1800s.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1244, 1120, 1131, 'Who made this? 😂', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1245, 1120, 1246, 'Relatable af.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1246, 1121, 1240, 'I''ve seen this one before, but it''s still gold.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1247, 1121, 1118, 'Relatable af.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1248, 1122, 1251, 'The quality we deserve.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1249, 1122, 1292, 'I''m in this picture and I don''t like it.', 65, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1250, 1123, 1196, 'Relatable af.', 66, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1251, 1123, 1117, 'I''m in this picture and I don''t like it.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1252, 1124, 1314, 'I''m in this picture and I don''t like it.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1253, 1124, 1061, 'This is why I love the internet.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1254, 1125, 1304, 'This is why I love the internet.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1255, 1125, 1061, 'Sending this to my group chat right now.', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1256, 1126, 1334, 'This is why I love the internet.', 44, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1257, 1127, 1294, 'Top tier meme.', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1258, 1127, 1382, 'I''ve seen this one before, but it''s still gold.', 82, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1259, 1127, 1013, 'The quality we deserve.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1260, 1128, 1351, 'Top tier meme.', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1261, 1128, 1186, 'I feel personally attacked by this.', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1262, 1129, 1281, 'Lmao so true!', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1263, 1130, 1076, 'Sending this to my group chat right now.', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1264, 1130, 1166, 'Relatable af.', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1265, 1130, 1014, 'Dead. 💀', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1266, 1131, 1249, 'This is why I love the internet.', 97, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1267, 1132, 1395, 'Dead. 💀', 22, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1268, 1133, 1118, 'I''m in this picture and I don''t like it.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1269, 1134, 1354, 'Lmao so true!', 44, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1270, 1134, 1383, 'Who made this? 😂', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1271, 1135, 1195, 'Sending this to my group chat right now.', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1272, 1135, 1030, 'Dead. 💀', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1273, 1136, 1335, 'Relatable af.', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1274, 1136, 1083, 'Who made this? 😂', 69, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1275, 1136, 1345, 'Wait, is this OC?', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1276, 1137, 1348, 'Relatable af.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1277, 1137, 1100, 'Modern art.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1278, 1137, 1355, 'Modern art.', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1279, 1138, 1151, 'Dead. 💀', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1280, 1138, 1236, 'This is why I love the internet.', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1281, 1138, 1047, 'I''ve seen this one before, but it''s still gold.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1282, 1139, 1088, 'Relatable af.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1283, 1140, 1371, 'The quality we deserve.', 77, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1284, 1140, 1388, 'Who made this? 😂', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1285, 1140, 1269, 'I''ve seen this one before, but it''s still gold.', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1286, 1141, 1093, 'Relatable af.', 59, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1287, 1141, 1402, 'The quality we deserve.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1288, 1142, 1283, 'Relatable af.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1289, 1143, 1420, 'I''m in this picture and I don''t like it.', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1290, 1143, 1222, 'Lmao so true!', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1291, 1143, 1313, 'Lmao so true!', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1292, 1144, 1014, 'I''m in this picture and I don''t like it.', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1293, 1145, 1305, 'I''m in this picture and I don''t like it.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1294, 1145, 1284, 'I''m in this picture and I don''t like it.', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1295, 1145, 1243, 'Dead. 💀', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1296, 1146, 1264, 'Modern art.', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1297, 1146, 1230, 'I''m in this picture and I don''t like it.', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1298, 1146, 1287, 'I''ve seen this one before, but it''s still gold.', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1299, 1147, 1331, 'I''m in this picture and I don''t like it.', 39, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1300, 1148, 1326, 'The quality we deserve.', 31, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1301, 1148, 1187, 'I feel personally attacked by this.', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1302, 1148, 1348, 'I''m in this picture and I don''t like it.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1303, 1149, 1071, 'Top tier meme.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1304, 1150, 1013, 'Lmao so true!', 61, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1305, 1150, 1334, 'Top tier meme.', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1306, 1151, 1320, 'I''ve seen this one before, but it''s still gold.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1307, 1151, 1180, 'I feel personally attacked by this.', 77, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1308, 1152, 1387, 'Imagine explaining this to someone from the 1800s.', 84, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1309, 1153, 1009, 'Relatable af.', 12, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1310, 1154, 1404, 'This is why I love the internet.', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1311, 1155, 1268, 'Dead. 💀', 92, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1312, 1155, 1288, 'Wait, is this OC?', 14, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1313, 1156, 1330, 'Who made this? 😂', 4, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1314, 1156, 1159, 'I feel personally attacked by this.', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1315, 1156, 1161, 'Who made this? 😂', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1316, 1157, 1271, 'Sending this to my group chat right now.', 37, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1317, 1157, 1050, 'Modern art.', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1318, 1157, 1368, 'Relatable af.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1319, 1158, 1405, 'Wait, is this OC?', 20, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1320, 1159, 1166, 'I''m in this picture and I don''t like it.', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1321, 1160, 1104, 'I''ve seen this one before, but it''s still gold.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1322, 1160, 1085, 'Who made this? 😂', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1323, 1160, 1105, 'I''ve seen this one before, but it''s still gold.', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1324, 1161, 1193, 'Sending this to my group chat right now.', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1325, 1161, 1060, 'I''ve seen this one before, but it''s still gold.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1326, 1162, 1341, 'Dead. 💀', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1327, 1162, 1088, 'Top tier meme.', 20, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1328, 1163, 1338, 'Modern art.', 62, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1329, 1164, 1045, 'This is why I love the internet.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1330, 1165, 1113, 'Lmao so true!', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1331, 1165, 1175, 'The quality we deserve.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1332, 1165, 1228, 'The quality we deserve.', 21, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1333, 1166, 1341, 'I''m in this picture and I don''t like it.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1334, 1166, 1058, 'The quality we deserve.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1335, 1166, 1153, 'Modern art.', 22, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1336, 1167, 1190, 'The quality we deserve.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1337, 1168, 1329, 'Relatable af.', 97, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1338, 1169, 1348, 'I feel personally attacked by this.', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1339, 1169, 1060, 'Dead. 💀', 84, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1340, 1170, 1005, 'The quality we deserve.', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1341, 1170, 1111, 'I''m in this picture and I don''t like it.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1342, 1171, 1291, 'I''m in this picture and I don''t like it.', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1343, 1171, 1140, 'The quality we deserve.', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1344, 1172, 1231, 'Dead. 💀', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1345, 1172, 1292, 'I feel personally attacked by this.', 92, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1346, 1172, 1421, 'Top tier meme.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1347, 1173, 1114, 'Modern art.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1348, 1174, 1185, 'This is why I love the internet.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1349, 1174, 1020, 'Lmao so true!', 14, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1350, 1175, 1025, 'The quality we deserve.', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1351, 1175, 1108, 'Imagine explaining this to someone from the 1800s.', 37, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1352, 1175, 1217, 'The quality we deserve.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1353, 1176, 1348, 'The quality we deserve.', 66, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1354, 1176, 1213, 'Relatable af.', 79, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1355, 1176, 1017, 'Sending this to my group chat right now.', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1356, 1177, 1122, 'Lmao so true!', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1357, 1177, 1086, 'Dead. 💀', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1358, 1178, 1421, 'Imagine explaining this to someone from the 1800s.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1359, 1178, 1058, 'Modern art.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1360, 1178, 1007, 'Imagine explaining this to someone from the 1800s.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1361, 1179, 1395, 'I''ve seen this one before, but it''s still gold.', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1362, 1179, 1222, 'Modern art.', 77, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1363, 1179, 1044, 'Who made this? 😂', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1364, 1180, 1216, 'Lmao so true!', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1365, 1180, 1157, 'The quality we deserve.', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1366, 1181, 1221, 'Who made this? 😂', 61, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1367, 1181, 1282, 'Imagine explaining this to someone from the 1800s.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1368, 1182, 1168, 'Dead. 💀', 10, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1369, 1183, 1161, 'I''ve seen this one before, but it''s still gold.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1370, 1183, 1339, 'This is why I love the internet.', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1371, 1183, 1361, 'Lmao so true!', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1372, 1184, 1130, 'Lmao so true!', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1373, 1185, 1228, 'Imagine explaining this to someone from the 1800s.', 77, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1374, 1185, 1398, 'The quality we deserve.', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1375, 1185, 1280, 'I feel personally attacked by this.', 47, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1376, 1186, 1108, 'Dead. 💀', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1377, 1186, 1044, 'Wait, is this OC?', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1378, 1186, 1295, 'Imagine explaining this to someone from the 1800s.', 19, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1379, 1187, 1285, 'Imagine explaining this to someone from the 1800s.', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1380, 1187, 1294, 'I''m in this picture and I don''t like it.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1381, 1187, 1004, 'Wait, is this OC?', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1382, 1188, 1307, 'Top tier meme.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1383, 1188, 1270, 'I''m in this picture and I don''t like it.', 83, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1384, 1189, 1112, 'I''ve seen this one before, but it''s still gold.', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1385, 1189, 1081, 'Relatable af.', 61, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1386, 1190, 1089, 'Relatable af.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1387, 1191, 1079, 'I feel personally attacked by this.', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1388, 1192, 1358, 'I feel personally attacked by this.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1389, 1193, 1005, 'I''m in this picture and I don''t like it.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1390, 1193, 1264, 'Dead. 💀', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1391, 1193, 1202, 'Imagine explaining this to someone from the 1800s.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1392, 1194, 1086, 'Who made this? 😂', 12, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1393, 1194, 1135, 'Imagine explaining this to someone from the 1800s.', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1394, 1194, 1150, 'Dead. 💀', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1395, 1195, 1402, 'The quality we deserve.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1396, 1195, 1377, 'The quality we deserve.', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1397, 1196, 1019, 'Relatable af.', 4, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1398, 1196, 1242, 'Modern art.', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1399, 1196, 1252, 'This is why I love the internet.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1400, 1197, 1365, 'Sending this to my group chat right now.', 74, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1401, 1198, 1021, 'I feel personally attacked by this.', 39, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1402, 1198, 1150, 'I''m in this picture and I don''t like it.', 39, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1403, 1199, 1258, 'Top tier meme.', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1404, 1200, 1219, 'I''m in this picture and I don''t like it.', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1405, 1200, 1210, 'The quality we deserve.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1406, 1200, 1219, 'Who made this? 😂', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1407, 1201, 1233, 'Modern art.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1408, 1202, 1053, 'I''m in this picture and I don''t like it.', 12, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1409, 1203, 1257, 'Wait, is this OC?', 83, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1410, 1203, 1178, 'Who made this? 😂', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1411, 1203, 1422, 'Sending this to my group chat right now.', 28, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1412, 1204, 1241, 'Lmao so true!', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1413, 1204, 1361, 'Dead. 💀', 69, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1414, 1205, 1125, 'Lmao so true!', 28, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1415, 1205, 1006, 'I''ve seen this one before, but it''s still gold.', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1416, 1206, 1145, 'I''m in this picture and I don''t like it.', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1417, 1206, 1302, 'I feel personally attacked by this.', 4, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1418, 1207, 1290, 'Wait, is this OC?', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1419, 1207, 1310, 'Imagine explaining this to someone from the 1800s.', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1420, 1208, 1239, 'Relatable af.', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1421, 1209, 1100, 'Top tier meme.', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1422, 1209, 1307, 'The quality we deserve.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1423, 1209, 1224, 'Relatable af.', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1424, 1210, 1008, 'Imagine explaining this to someone from the 1800s.', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1425, 1210, 1136, 'Modern art.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1426, 1210, 1122, 'I feel personally attacked by this.', 52, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1427, 1211, 1287, 'Lmao so true!', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1428, 1211, 1231, 'Top tier meme.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1429, 1211, 1163, 'Modern art.', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1430, 1212, 1118, 'Relatable af.', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1431, 1212, 1247, 'Top tier meme.', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1432, 1212, 1185, 'I''m in this picture and I don''t like it.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1433, 1213, 1399, 'Modern art.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1434, 1214, 1371, 'Who made this? 😂', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1435, 1215, 1217, 'Top tier meme.', 35, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1436, 1215, 1061, 'Sending this to my group chat right now.', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1437, 1215, 1186, 'I''ve seen this one before, but it''s still gold.', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1438, 1216, 1370, 'This is why I love the internet.', 35, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1439, 1216, 1340, 'The quality we deserve.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1440, 1216, 1337, 'I feel personally attacked by this.', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1441, 1217, 1149, 'This is why I love the internet.', 53, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1442, 1218, 1397, 'Modern art.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1443, 1218, 1401, 'Who made this? 😂', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1444, 1219, 1254, 'The quality we deserve.', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1445, 1219, 1349, 'This is why I love the internet.', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1446, 1219, 1202, 'Relatable af.', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1447, 1220, 1076, 'Modern art.', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1448, 1221, 1186, 'This is why I love the internet.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1449, 1221, 1138, 'Relatable af.', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1450, 1221, 1298, 'Relatable af.', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1451, 1222, 1141, 'This is why I love the internet.', 31, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1452, 1222, 1320, 'Sending this to my group chat right now.', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1453, 1223, 1331, 'I''ve seen this one before, but it''s still gold.', 79, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1454, 1224, 1355, 'Modern art.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1455, 1224, 1120, 'Imagine explaining this to someone from the 1800s.', 7, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1456, 1224, 1348, 'Imagine explaining this to someone from the 1800s.', 82, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1457, 1225, 1267, 'Sending this to my group chat right now.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1458, 1225, 1143, 'I''ve seen this one before, but it''s still gold.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1459, 1226, 1004, 'Top tier meme.', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1460, 1227, 1025, 'Who made this? 😂', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1461, 1227, 1228, 'I feel personally attacked by this.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1462, 1228, 1024, 'Lmao so true!', 65, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1463, 1228, 1243, 'Wait, is this OC?', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1464, 1229, 1254, 'Lmao so true!', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1465, 1230, 1120, 'I feel personally attacked by this.', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1466, 1231, 1210, 'This is why I love the internet.', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1467, 1231, 1325, 'Sending this to my group chat right now.', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1468, 1232, 1408, 'Modern art.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1469, 1232, 1216, 'This is why I love the internet.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1470, 1232, 1389, 'Who made this? 😂', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1471, 1233, 1181, 'This is why I love the internet.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1472, 1233, 1392, 'Who made this? 😂', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1473, 1233, 1296, 'Top tier meme.', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1474, 1234, 1201, 'Relatable af.', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1475, 1235, 1295, 'This is why I love the internet.', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1476, 1236, 1058, 'Who made this? 😂', 62, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1477, 1237, 1327, 'Modern art.', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1478, 1237, 1052, 'Modern art.', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1479, 1238, 1218, 'Sending this to my group chat right now.', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1480, 1238, 1239, 'I''ve seen this one before, but it''s still gold.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1481, 1239, 1406, 'Sending this to my group chat right now.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1482, 1239, 1393, 'Modern art.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1483, 1240, 1109, 'Wait, is this OC?', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1484, 1241, 1026, 'I''ve seen this one before, but it''s still gold.', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1485, 1241, 1382, 'Dead. 💀', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1486, 1242, 1166, 'Imagine explaining this to someone from the 1800s.', 44, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1487, 1243, 1418, 'Who made this? 😂', 56, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1488, 1243, 1183, 'Wait, is this OC?', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1489, 1244, 1347, 'Top tier meme.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1490, 1244, 1290, 'This is why I love the internet.', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1491, 1245, 1358, 'Wait, is this OC?', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1492, 1246, 1428, 'Relatable af.', 21, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1493, 1247, 1196, 'Who made this? 😂', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1494, 1247, 1357, 'Lmao so true!', 59, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1495, 1248, 1083, 'Who made this? 😂', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1496, 1249, 1213, 'I''m in this picture and I don''t like it.', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1497, 1249, 1209, 'I feel personally attacked by this.', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1498, 1250, 1145, 'I feel personally attacked by this.', 5, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1499, 1250, 1222, 'Lmao so true!', 44, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1500, 1251, 1155, 'I feel personally attacked by this.', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1501, 1251, 1017, 'I''ve seen this one before, but it''s still gold.', 66, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1502, 1252, 1306, 'Dead. 💀', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1503, 1253, 1391, 'I''ve seen this one before, but it''s still gold.', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1504, 1253, 1270, 'The quality we deserve.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1505, 1254, 1193, 'Lmao so true!', 83, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1506, 1254, 1116, 'Imagine explaining this to someone from the 1800s.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1507, 1254, 1276, 'Who made this? 😂', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1508, 1255, 1394, 'I''m in this picture and I don''t like it.', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1509, 1255, 1282, 'Lmao so true!', 84, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1510, 1256, 1237, 'Sending this to my group chat right now.', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1511, 1257, 1112, 'Sending this to my group chat right now.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1512, 1258, 1027, 'I''ve seen this one before, but it''s still gold.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1513, 1259, 1303, 'Who made this? 😂', 53, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1514, 1260, 1368, 'Wait, is this OC?', 53, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1515, 1260, 1130, 'Wait, is this OC?', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1516, 1260, 1213, 'This is why I love the internet.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1517, 1261, 1009, 'I''ve seen this one before, but it''s still gold.', 22, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1518, 1261, 1029, 'The quality we deserve.', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1519, 1262, 1268, 'The quality we deserve.', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1520, 1262, 1264, 'Modern art.', 21, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1521, 1262, 1369, 'I''ve seen this one before, but it''s still gold.', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1522, 1263, 1377, 'Relatable af.', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1523, 1263, 1073, 'Modern art.', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1524, 1263, 1155, 'Imagine explaining this to someone from the 1800s.', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1525, 1264, 1154, 'Who made this? 😂', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1526, 1264, 1207, 'Modern art.', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1527, 1264, 1318, 'I feel personally attacked by this.', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1528, 1265, 1312, 'The quality we deserve.', 69, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1529, 1265, 1293, 'I''ve seen this one before, but it''s still gold.', 10, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1530, 1266, 1103, 'Who made this? 😂', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1531, 1266, 1390, 'I''m in this picture and I don''t like it.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1532, 1267, 1061, 'Top tier meme.', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1533, 1267, 1331, 'This is why I love the internet.', 79, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1534, 1267, 1033, 'Dead. 💀', 84, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1535, 1268, 1106, 'Relatable af.', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1536, 1268, 1193, 'Relatable af.', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1537, 1268, 1099, 'Sending this to my group chat right now.', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1538, 1269, 1336, 'Sending this to my group chat right now.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1539, 1269, 1187, 'Sending this to my group chat right now.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1540, 1270, 1251, 'This is why I love the internet.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1541, 1270, 1417, 'I feel personally attacked by this.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1542, 1271, 1118, 'Dead. 💀', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1543, 1271, 1169, 'I''m in this picture and I don''t like it.', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1544, 1272, 1088, 'Top tier meme.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1545, 1273, 1060, 'Sending this to my group chat right now.', 69, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1546, 1274, 1236, 'Modern art.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1547, 1274, 1189, 'Sending this to my group chat right now.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1548, 1274, 1082, 'Who made this? 😂', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1549, 1275, 1126, 'Top tier meme.', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1550, 1276, 1199, 'Dead. 💀', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1551, 1276, 1123, 'Sending this to my group chat right now.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1552, 1277, 1161, 'Dead. 💀', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1553, 1277, 1055, 'The quality we deserve.', 65, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1554, 1278, 1391, 'I feel personally attacked by this.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1555, 1278, 1255, 'Imagine explaining this to someone from the 1800s.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1556, 1278, 1200, 'Dead. 💀', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1557, 1279, 1078, 'Dead. 💀', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1558, 1279, 1167, 'Wait, is this OC?', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1559, 1280, 1396, 'This is why I love the internet.', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1560, 1281, 1073, 'Imagine explaining this to someone from the 1800s.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1561, 1281, 1314, 'Lmao so true!', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1562, 1281, 1089, 'I feel personally attacked by this.', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1563, 1282, 1370, 'Relatable af.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1564, 1282, 1302, 'I''m in this picture and I don''t like it.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1565, 1282, 1307, 'I''m in this picture and I don''t like it.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1566, 1283, 1386, 'I feel personally attacked by this.', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1567, 1283, 1347, 'Lmao so true!', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1568, 1283, 1117, 'Wait, is this OC?', 5, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1569, 1284, 1213, 'I feel personally attacked by this.', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1570, 1284, 1288, 'Sending this to my group chat right now.', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1571, 1285, 1363, 'Top tier meme.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1572, 1285, 1145, 'The quality we deserve.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1573, 1285, 1408, 'Relatable af.', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1574, 1286, 1070, 'I''ve seen this one before, but it''s still gold.', 56, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1575, 1287, 1020, 'I''m in this picture and I don''t like it.', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1576, 1287, 1240, 'I feel personally attacked by this.', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1577, 1287, 1351, 'I feel personally attacked by this.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1578, 1288, 1359, 'Sending this to my group chat right now.', 50, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1579, 1289, 1208, 'Lmao so true!', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1580, 1289, 1299, 'I''ve seen this one before, but it''s still gold.', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1581, 1290, 1099, 'I''m in this picture and I don''t like it.', 28, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1582, 1290, 1014, 'Lmao so true!', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1583, 1291, 1239, 'Who made this? 😂', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1584, 1291, 1186, 'I feel personally attacked by this.', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1585, 1292, 1079, 'Who made this? 😂', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1586, 1292, 1307, 'This is why I love the internet.', 69, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1587, 1292, 1251, 'Top tier meme.', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1588, 1293, 1296, 'I feel personally attacked by this.', 20, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1589, 1293, 1191, 'I''ve seen this one before, but it''s still gold.', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1590, 1293, 1290, 'This is why I love the internet.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1591, 1294, 1120, 'Sending this to my group chat right now.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1592, 1294, 1117, 'Who made this? 😂', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1593, 1294, 1244, 'Modern art.', 5, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1594, 1295, 1382, 'Imagine explaining this to someone from the 1800s.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1595, 1295, 1160, 'Who made this? 😂', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1596, 1295, 1104, 'Dead. 💀', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1597, 1296, 1097, 'Sending this to my group chat right now.', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1598, 1296, 1085, 'This is why I love the internet.', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1599, 1297, 1069, 'Top tier meme.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1600, 1297, 1094, 'Who made this? 😂', 7, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1601, 1298, 1092, 'I''m in this picture and I don''t like it.', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1602, 1298, 1228, 'Dead. 💀', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1603, 1298, 1205, 'Lmao so true!', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1604, 1299, 1082, 'I''ve seen this one before, but it''s still gold.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1605, 1300, 1034, 'Dead. 💀', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1606, 1300, 1237, 'Sending this to my group chat right now.', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1607, 1301, 1392, 'Who made this? 😂', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1608, 1302, 1379, 'Lmao so true!', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1609, 1303, 1292, 'Who made this? 😂', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1610, 1303, 1353, 'I''ve seen this one before, but it''s still gold.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1611, 1303, 1122, 'I feel personally attacked by this.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1612, 1304, 1012, 'Imagine explaining this to someone from the 1800s.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1613, 1304, 1338, 'Top tier meme.', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1614, 1305, 1216, 'I''ve seen this one before, but it''s still gold.', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1615, 1306, 1219, 'I''m in this picture and I don''t like it.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1616, 1306, 1094, 'I feel personally attacked by this.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1617, 1307, 1145, 'This is why I love the internet.', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1618, 1307, 1195, 'Who made this? 😂', 37, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1619, 1308, 1227, 'Top tier meme.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1620, 1308, 1322, 'Modern art.', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1621, 1309, 1394, 'Top tier meme.', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1622, 1309, 1015, 'I''ve seen this one before, but it''s still gold.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1623, 1310, 1036, 'Top tier meme.', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1624, 1310, 1397, 'Lmao so true!', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1625, 1310, 1131, 'Top tier meme.', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1626, 1311, 1407, 'Sending this to my group chat right now.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1627, 1311, 1135, 'Modern art.', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1628, 1312, 1064, 'Wait, is this OC?', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1629, 1312, 1107, 'I''m in this picture and I don''t like it.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1630, 1312, 1178, 'Wait, is this OC?', 82, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1631, 1313, 1242, 'Top tier meme.', 69, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1632, 1314, 1191, 'Modern art.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1633, 1314, 1288, 'Who made this? 😂', 74, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1634, 1315, 1193, 'Dead. 💀', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1635, 1315, 1266, 'I''m in this picture and I don''t like it.', 52, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1636, 1316, 1065, 'Dead. 💀', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1637, 1316, 1318, 'Lmao so true!', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1638, 1317, 1085, 'Modern art.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1639, 1317, 1120, 'Imagine explaining this to someone from the 1800s.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1640, 1318, 1241, 'Dead. 💀', 20, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1641, 1318, 1293, 'Imagine explaining this to someone from the 1800s.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1642, 1319, 1187, 'Dead. 💀', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1643, 1319, 1182, 'Who made this? 😂', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1644, 1319, 1224, 'Sending this to my group chat right now.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1645, 1320, 1081, 'Lmao so true!', 83, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1646, 1320, 1109, 'I''m in this picture and I don''t like it.', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1647, 1321, 1192, 'I feel personally attacked by this.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1648, 1322, 1007, 'The quality we deserve.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1649, 1323, 1022, 'Modern art.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1650, 1323, 1392, 'Dead. 💀', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1651, 1323, 1324, 'Who made this? 😂', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1652, 1324, 1217, 'I''m in this picture and I don''t like it.', 56, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1653, 1324, 1292, 'The quality we deserve.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1654, 1325, 1227, 'I''m in this picture and I don''t like it.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1655, 1325, 1046, 'Wait, is this OC?', 66, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1656, 1326, 1063, 'I feel personally attacked by this.', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1657, 1327, 1138, 'Top tier meme.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1658, 1327, 1407, 'This is why I love the internet.', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1659, 1328, 1411, 'Who made this? 😂', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1660, 1328, 1211, 'Relatable af.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1661, 1328, 1084, 'The quality we deserve.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1662, 1329, 1424, 'I''ve seen this one before, but it''s still gold.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1663, 1329, 1145, 'Wait, is this OC?', 12, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1664, 1330, 1055, 'Wait, is this OC?', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1665, 1330, 1001, 'This is why I love the internet.', 22, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1666, 1331, 1334, 'I feel personally attacked by this.', 74, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1667, 1331, 1098, 'I''m in this picture and I don''t like it.', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1668, 1332, 1384, 'I feel personally attacked by this.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1669, 1332, 1049, 'I feel personally attacked by this.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1670, 1333, 1191, 'Lmao so true!', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1671, 1333, 1407, 'I feel personally attacked by this.', 59, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1672, 1333, 1235, 'This is why I love the internet.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1673, 1334, 1234, 'Modern art.', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1674, 1335, 1292, 'I''m in this picture and I don''t like it.', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1675, 1336, 1079, 'The quality we deserve.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1676, 1336, 1395, 'The quality we deserve.', 21, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1677, 1336, 1141, 'This is why I love the internet.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1678, 1337, 1239, 'Top tier meme.', 62, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1679, 1337, 1002, 'Modern art.', 52, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1680, 1337, 1332, 'Relatable af.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1681, 1338, 1366, 'I''m in this picture and I don''t like it.', 19, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1682, 1338, 1076, 'This is why I love the internet.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1683, 1338, 1316, 'Relatable af.', 31, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1684, 1339, 1394, 'Dead. 💀', 5, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1685, 1339, 1087, 'This is why I love the internet.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1686, 1339, 1334, 'Dead. 💀', 31, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1687, 1340, 1196, 'I feel personally attacked by this.', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1688, 1340, 1118, 'Wait, is this OC?', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1689, 1341, 1337, 'This is why I love the internet.', 7, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1690, 1341, 1097, 'Sending this to my group chat right now.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1691, 1341, 1324, 'Modern art.', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1692, 1342, 1215, 'The quality we deserve.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1693, 1343, 1138, 'This is why I love the internet.', 47, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1694, 1343, 1005, 'The quality we deserve.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1695, 1344, 1424, 'Modern art.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1696, 1344, 1386, 'Top tier meme.', 39, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1697, 1345, 1239, 'I feel personally attacked by this.', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1698, 1345, 1265, 'Sending this to my group chat right now.', 97, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1699, 1346, 1092, 'I''m in this picture and I don''t like it.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1700, 1347, 1075, 'Wait, is this OC?', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1701, 1348, 1195, 'Wait, is this OC?', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1702, 1348, 1091, 'Wait, is this OC?', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1703, 1349, 1028, 'I''m in this picture and I don''t like it.', 53, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1704, 1349, 1122, 'Modern art.', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1705, 1349, 1151, 'Lmao so true!', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1706, 1350, 1288, 'Dead. 💀', 97, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1707, 1351, 1351, 'Top tier meme.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1708, 1351, 1286, 'I''m in this picture and I don''t like it.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1709, 1352, 1307, 'I''m in this picture and I don''t like it.', 59, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1710, 1353, 1028, 'Lmao so true!', 16, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1711, 1353, 1286, 'Dead. 💀', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1712, 1353, 1286, 'Who made this? 😂', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1713, 1354, 1244, 'Lmao so true!', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1714, 1355, 1080, 'Modern art.', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1715, 1356, 1148, 'Wait, is this OC?', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1716, 1356, 1086, 'I feel personally attacked by this.', 37, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1717, 1356, 1045, 'Top tier meme.', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1718, 1357, 1301, 'The quality we deserve.', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1719, 1358, 1305, 'I feel personally attacked by this.', 86, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1720, 1358, 1307, 'I''m in this picture and I don''t like it.', 5, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1721, 1359, 1155, 'I feel personally attacked by this.', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1722, 1359, 1285, 'Wait, is this OC?', 19, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1723, 1360, 1367, 'Relatable af.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1724, 1361, 1363, 'I''ve seen this one before, but it''s still gold.', 92, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1725, 1361, 1143, 'Who made this? 😂', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1726, 1361, 1186, 'Imagine explaining this to someone from the 1800s.', 44, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1727, 1362, 1302, 'Imagine explaining this to someone from the 1800s.', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1728, 1363, 1347, 'Lmao so true!', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1729, 1363, 1002, 'The quality we deserve.', 21, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1730, 1363, 1388, 'Relatable af.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1731, 1364, 1210, 'I''m in this picture and I don''t like it.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1732, 1365, 1002, 'Sending this to my group chat right now.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1733, 1365, 1094, 'Lmao so true!', 47, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1734, 1366, 1055, 'Who made this? 😂', 52, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1735, 1366, 1211, 'This is why I love the internet.', 19, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1736, 1367, 1016, 'Sending this to my group chat right now.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1737, 1367, 1321, 'Top tier meme.', 44, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1738, 1368, 1172, 'Relatable af.', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1739, 1368, 1232, 'I feel personally attacked by this.', 7, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1740, 1369, 1279, 'Imagine explaining this to someone from the 1800s.', 82, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1741, 1370, 1017, 'I feel personally attacked by this.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1742, 1371, 1409, 'This is why I love the internet.', 47, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1743, 1371, 1108, 'Relatable af.', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1744, 1372, 1128, 'Modern art.', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1745, 1373, 1086, 'Who made this? 😂', 35, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1746, 1373, 1213, 'Modern art.', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1747, 1374, 1130, 'Lmao so true!', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1748, 1374, 1081, 'Lmao so true!', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1749, 1374, 1417, 'Modern art.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1750, 1375, 1239, 'Relatable af.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1751, 1376, 1174, 'Relatable af.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1752, 1376, 1380, 'Modern art.', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1753, 1376, 1102, 'I''ve seen this one before, but it''s still gold.', 14, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1754, 1377, 1410, 'I''ve seen this one before, but it''s still gold.', 63, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1755, 1377, 1166, 'Who made this? 😂', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1756, 1377, 1395, 'I''ve seen this one before, but it''s still gold.', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1757, 1378, 1287, 'Modern art.', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1758, 1378, 1238, 'Who made this? 😂', 31, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1759, 1379, 1040, 'Sending this to my group chat right now.', 53, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1760, 1379, 1423, 'Lmao so true!', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1761, 1379, 1313, 'This is why I love the internet.', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1762, 1380, 1248, 'Sending this to my group chat right now.', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1763, 1380, 1287, 'I feel personally attacked by this.', 77, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1764, 1380, 1143, 'I feel personally attacked by this.', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1765, 1381, 1315, 'Top tier meme.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1766, 1381, 1252, 'I''ve seen this one before, but it''s still gold.', 44, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1767, 1382, 1046, 'Modern art.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1768, 1382, 1313, 'This is why I love the internet.', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1769, 1382, 1062, 'I feel personally attacked by this.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1770, 1383, 1142, 'Modern art.', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1771, 1384, 1352, 'This is why I love the internet.', 10, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1772, 1385, 1221, 'This is why I love the internet.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1773, 1385, 1218, 'Top tier meme.', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1774, 1385, 1277, 'The quality we deserve.', 4, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1775, 1386, 1185, 'I''m in this picture and I don''t like it.', 14, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1776, 1386, 1375, 'Wait, is this OC?', 19, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1777, 1387, 1154, 'Sending this to my group chat right now.', 78, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1778, 1387, 1410, 'I''ve seen this one before, but it''s still gold.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1779, 1387, 1209, 'I''m in this picture and I don''t like it.', 51, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1780, 1388, 1366, 'Top tier meme.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1781, 1388, 1382, 'Dead. 💀', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1782, 1389, 1148, 'I feel personally attacked by this.', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1783, 1389, 1259, 'I feel personally attacked by this.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1784, 1390, 1332, 'Dead. 💀', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1785, 1390, 1237, 'Relatable af.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1786, 1390, 1400, 'Dead. 💀', 82, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1787, 1391, 1111, 'The quality we deserve.', 21, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1788, 1391, 1272, 'I feel personally attacked by this.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1789, 1392, 1231, 'This is why I love the internet.', 14, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1790, 1393, 1149, 'Relatable af.', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1791, 1393, 1109, 'Sending this to my group chat right now.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1792, 1393, 1266, 'Lmao so true!', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1793, 1394, 1383, 'I''ve seen this one before, but it''s still gold.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1794, 1394, 1238, 'Sending this to my group chat right now.', 46, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1795, 1395, 1424, 'Wait, is this OC?', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1796, 1395, 1147, 'I''m in this picture and I don''t like it.', 30, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1797, 1396, 1397, 'Wait, is this OC?', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1798, 1396, 1172, 'I''ve seen this one before, but it''s still gold.', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1799, 1397, 1179, 'I''ve seen this one before, but it''s still gold.', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1800, 1397, 1164, 'Dead. 💀', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1801, 1397, 1166, 'Sending this to my group chat right now.', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1802, 1398, 1162, 'Top tier meme.', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1803, 1399, 1412, 'Top tier meme.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1804, 1400, 1377, 'Dead. 💀', 85, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1805, 1400, 1082, 'I feel personally attacked by this.', 74, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1806, 1400, 1266, 'I feel personally attacked by this.', 65, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1807, 1401, 1050, 'I''m in this picture and I don''t like it.', 57, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1808, 1402, 1093, 'Sending this to my group chat right now.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1809, 1402, 1300, 'Top tier meme.', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1810, 1402, 1203, 'Top tier meme.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1811, 1403, 1196, 'Relatable af.', 8, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1812, 1403, 1268, 'Dead. 💀', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1813, 1404, 1245, 'Relatable af.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1814, 1404, 1260, 'Imagine explaining this to someone from the 1800s.', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1815, 1404, 1022, 'Lmao so true!', 65, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1816, 1405, 1065, 'Modern art.', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1817, 1405, 1067, 'This is why I love the internet.', 12, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1818, 1406, 1379, 'Wait, is this OC?', 84, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1819, 1407, 1124, 'Sending this to my group chat right now.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1820, 1407, 1169, 'I''m in this picture and I don''t like it.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1821, 1408, 1416, 'I feel personally attacked by this.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1822, 1408, 1371, 'Modern art.', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1823, 1408, 1216, 'I''m in this picture and I don''t like it.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1824, 1409, 1303, 'Relatable af.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1825, 1409, 1248, 'Imagine explaining this to someone from the 1800s.', 28, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1826, 1409, 1031, 'Wait, is this OC?', 7, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1827, 1410, 1369, 'Lmao so true!', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1828, 1410, 1111, 'Wait, is this OC?', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1829, 1411, 1331, 'Imagine explaining this to someone from the 1800s.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1830, 1411, 1299, 'Dead. 💀', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1831, 1411, 1384, 'Relatable af.', 12, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1832, 1412, 1156, 'I''m in this picture and I don''t like it.', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1833, 1412, 1370, 'This is why I love the internet.', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1834, 1413, 1333, 'I feel personally attacked by this.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1835, 1413, 1030, 'Modern art.', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1836, 1414, 1227, 'Lmao so true!', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1837, 1414, 1224, 'Wait, is this OC?', 47, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1838, 1415, 1414, 'I feel personally attacked by this.', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1839, 1415, 1110, 'Lmao so true!', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1840, 1416, 1045, 'Sending this to my group chat right now.', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1841, 1416, 1190, 'Top tier meme.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1842, 1416, 1348, 'Wait, is this OC?', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1843, 1417, 1274, 'The quality we deserve.', 87, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1844, 1418, 1221, 'I feel personally attacked by this.', 47, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1845, 1419, 1271, 'The quality we deserve.', 14, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1846, 1419, 1241, 'Lmao so true!', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1847, 1420, 1355, 'I''m in this picture and I don''t like it.', 45, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1848, 1420, 1149, 'Lmao so true!', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1849, 1421, 1137, 'I''ve seen this one before, but it''s still gold.', 80, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1850, 1421, 1302, 'Who made this? 😂', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1851, 1422, 1252, 'Modern art.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1852, 1423, 1246, 'I''m in this picture and I don''t like it.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1853, 1423, 1401, 'I feel personally attacked by this.', 6, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1854, 1424, 1333, 'This is why I love the internet.', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1855, 1425, 1152, 'I''m in this picture and I don''t like it.', 11, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1856, 1425, 1039, 'Relatable af.', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1857, 1425, 1357, 'Dead. 💀', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1858, 1426, 1378, 'Dead. 💀', 26, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1859, 1426, 1302, 'Relatable af.', 77, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1860, 1427, 1368, 'The quality we deserve.', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1861, 1427, 1415, 'Wait, is this OC?', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1862, 1427, 1169, 'I feel personally attacked by this.', 56, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1863, 1428, 1327, 'Top tier meme.', 29, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1864, 1428, 1386, 'Top tier meme.', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1865, 1429, 1045, 'Wait, is this OC?', 58, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1866, 1429, 1096, 'I feel personally attacked by this.', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1867, 1429, 1283, 'I feel personally attacked by this.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1868, 1430, 1409, 'I''m in this picture and I don''t like it.', 77, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1869, 1430, 1376, 'I''m in this picture and I don''t like it.', 0, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1870, 1431, 1074, 'I feel personally attacked by this.', 24, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1871, 1431, 1285, 'I''ve seen this one before, but it''s still gold.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1872, 1432, 1168, 'Who made this? 😂', 9, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1873, 1432, 1339, 'Imagine explaining this to someone from the 1800s.', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1874, 1432, 1410, 'Top tier meme.', 52, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1875, 1433, 1170, 'I feel personally attacked by this.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1876, 1434, 1058, 'Modern art.', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1877, 1435, 1271, 'I feel personally attacked by this.', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1878, 1435, 1027, 'Relatable af.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1879, 1436, 1134, 'Top tier meme.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1880, 1437, 1305, 'Relatable af.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1881, 1437, 1189, 'Sending this to my group chat right now.', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1882, 1437, 1038, 'I feel personally attacked by this.', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1883, 1438, 1297, 'Relatable af.', 61, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1884, 1438, 1185, 'Relatable af.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1885, 1438, 1294, 'Lmao so true!', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1886, 1439, 1238, 'Wait, is this OC?', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1887, 1439, 1091, 'I''ve seen this one before, but it''s still gold.', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1888, 1440, 1376, 'The quality we deserve.', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1889, 1440, 1426, 'The quality we deserve.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1890, 1441, 1004, 'Dead. 💀', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1891, 1441, 1006, 'Modern art.', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1892, 1441, 1072, 'Dead. 💀', 28, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1893, 1442, 1087, 'I''m in this picture and I don''t like it.', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1894, 1442, 1097, 'Top tier meme.', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1895, 1443, 1348, 'This is why I love the internet.', 37, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1896, 1443, 1403, 'This is why I love the internet.', 17, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1897, 1444, 1369, 'The quality we deserve.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1898, 1445, 1134, 'I''ve seen this one before, but it''s still gold.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1899, 1446, 1243, 'Lmao so true!', 82, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1900, 1447, 1301, 'Modern art.', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1901, 1447, 1097, 'Modern art.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1902, 1447, 1363, 'This is why I love the internet.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1903, 1448, 1290, 'Modern art.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1904, 1448, 1278, 'Sending this to my group chat right now.', 35, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1905, 1449, 1055, 'Top tier meme.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1906, 1449, 1063, 'Dead. 💀', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1907, 1450, 1293, 'This is why I love the internet.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1908, 1451, 1040, 'Modern art.', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1909, 1451, 1342, 'Modern art.', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1910, 1451, 1195, 'Wait, is this OC?', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1911, 1452, 1295, 'Modern art.', 92, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1912, 1453, 1370, 'Imagine explaining this to someone from the 1800s.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1913, 1453, 1416, 'Lmao so true!', 48, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1914, 1454, 1240, 'I''m in this picture and I don''t like it.', 84, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1915, 1455, 1239, 'The quality we deserve.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1916, 1456, 1204, 'Sending this to my group chat right now.', 42, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1917, 1456, 1252, 'I''m in this picture and I don''t like it.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1918, 1457, 1009, 'Relatable af.', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1919, 1457, 1388, 'Dead. 💀', 32, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1920, 1457, 1283, 'Who made this? 😂', 75, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1921, 1458, 1203, 'Top tier meme.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1922, 1459, 1332, 'Relatable af.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1923, 1460, 1016, 'Sending this to my group chat right now.', 13, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1924, 1460, 1300, 'Wait, is this OC?', 93, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1925, 1461, 1095, 'Sending this to my group chat right now.', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1926, 1461, 1252, 'I feel personally attacked by this.', 97, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1927, 1461, 1208, 'I''ve seen this one before, but it''s still gold.', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1928, 1462, 1078, 'Dead. 💀', 18, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1929, 1462, 1230, 'The quality we deserve.', 71, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1930, 1462, 1028, 'Lmao so true!', 72, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1931, 1463, 1400, 'Wait, is this OC?', 54, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1932, 1463, 1369, 'Who made this? 😂', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1933, 1464, 1126, 'I feel personally attacked by this.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1934, 1464, 1395, 'Imagine explaining this to someone from the 1800s.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1935, 1465, 1210, 'I feel personally attacked by this.', 56, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1936, 1465, 1131, 'The quality we deserve.', 55, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1937, 1466, 1073, 'Who made this? 😂', 36, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1938, 1467, 1232, 'Top tier meme.', 92, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1939, 1467, 1200, 'Relatable af.', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1940, 1468, 1295, 'This is why I love the internet.', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1941, 1468, 1397, 'Modern art.', 53, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1942, 1469, 1251, 'Imagine explaining this to someone from the 1800s.', 61, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1943, 1470, 1334, 'Top tier meme.', 73, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1944, 1470, 1028, 'Lmao so true!', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1945, 1470, 1362, 'This is why I love the internet.', 31, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1946, 1471, 1421, 'Dead. 💀', 99, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1947, 1471, 1003, 'The quality we deserve.', 96, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1948, 1471, 1298, 'Wait, is this OC?', 65, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1949, 1472, 1383, 'I''m in this picture and I don''t like it.', 64, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1950, 1472, 1374, 'Relatable af.', 1, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1951, 1473, 1388, 'I feel personally attacked by this.', 76, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1952, 1473, 1001, 'Wait, is this OC?', 86, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1953, 1474, 1335, 'Lmao so true!', 7, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1954, 1474, 1232, 'Relatable af.', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1955, 1475, 1116, 'Relatable af.', 94, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1956, 1475, 1386, 'The quality we deserve.', 23, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1957, 1475, 1158, 'Dead. 💀', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1958, 1476, 1337, 'This is why I love the internet.', 89, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1959, 1476, 1313, 'Wait, is this OC?', 2, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1960, 1476, 1306, 'Wait, is this OC?', 66, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1961, 1477, 1016, 'Relatable af.', 38, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1962, 1477, 1104, 'I''ve seen this one before, but it''s still gold.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1963, 1478, 1148, 'This is why I love the internet.', 62, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1964, 1478, 1171, 'Lmao so true!', 98, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1965, 1479, 1361, 'I''ve seen this one before, but it''s still gold.', 68, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1966, 1479, 1347, 'Wait, is this OC?', 70, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1967, 1480, 1316, 'The quality we deserve.', 25, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1968, 1480, 1334, 'Top tier meme.', 15, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1969, 1480, 1075, 'Who made this? 😂', 88, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1970, 1481, 1363, 'Sending this to my group chat right now.', 91, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1971, 1482, 1227, 'Dead. 💀', 28, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1972, 1483, 1402, 'I feel personally attacked by this.', 33, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1973, 1484, 1118, 'Wait, is this OC?', 27, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1974, 1484, 1165, 'I feel personally attacked by this.', 95, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1975, 1485, 1268, 'Top tier meme.', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1976, 1485, 1251, 'Top tier meme.', 41, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1977, 1486, 1056, 'Top tier meme.', 43, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1978, 1487, 1314, 'Wait, is this OC?', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1979, 1487, 1293, 'I feel personally attacked by this.', 49, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1980, 1487, 1014, 'I''ve seen this one before, but it''s still gold.', 37, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1981, 1488, 1051, 'Lmao so true!', 40, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1982, 1488, 1229, 'Dead. 💀', 34, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1983, 1489, 1161, 'Sending this to my group chat right now.', 31, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1984, 1489, 1343, 'Sending this to my group chat right now.', 67, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1985, 1490, 1126, 'I''ve seen this one before, but it''s still gold.', 81, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1986, 1491, 1200, 'This is why I love the internet.', 60, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1987, 1491, 1086, 'I''m in this picture and I don''t like it.', 4, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1988, 1492, 1037, 'Imagine explaining this to someone from the 1800s.', 90, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1989, 1493, 1349, 'Dead. 💀', 3, 0, NOW(), NOW());
INSERT INTO comments (id, post_id, author_id, content, score, depth, created_at, updated_at) 
VALUES (1990, 1493, 1113, 'Wait, is this OC?', 44, 0, NOW(), NOW());

-- 6. Finalize counts
UPDATE communities SET post_count = (SELECT count(*) FROM posts WHERE posts.community_id = communities.id) WHERE id >= 100;
UPDATE posts SET comment_count = (SELECT count(*) FROM comments WHERE comments.post_id = posts.id) WHERE id >= 1000;
