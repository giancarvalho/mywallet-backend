--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.users.id;


--
-- Name: entries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entries (
    id integer NOT NULL,
    "userId" integer,
    description text,
    date date,
    type text,
    amount integer
);


ALTER TABLE public.entries OWNER TO postgres;

--
-- Name: entries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.entries_id_seq OWNER TO postgres;

--
-- Name: entries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entries_id_seq OWNED BY public.entries.id;


--
-- Name: passwords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.passwords (
    id integer NOT NULL,
    "userId" integer,
    password text
);


ALTER TABLE public.passwords OWNER TO postgres;

--
-- Name: passwords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.passwords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.passwords_id_seq OWNER TO postgres;

--
-- Name: passwords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.passwords_id_seq OWNED BY public.passwords.id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    "userId" integer,
    token text
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- Name: entries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entries ALTER COLUMN id SET DEFAULT nextval('public.entries_id_seq'::regclass);


--
-- Name: passwords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passwords ALTER COLUMN id SET DEFAULT nextval('public.passwords_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Data for Name: entries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entries (id, "userId", description, date, type, amount) FROM stdin;
6	13	eating out with SO	2021-10-22	expense	1569
7	13	eating out with SO	2021-10-22	expense	1569
8	13	eating out with SO	2021-10-22	income	4569
9	11	Bought a new PC	2021-10-22	expense	300000
10	11	Bought a new chair	2021-10-22	expense	63590
11	13	Loan from Henry	2021-10-23	income	30000
12	13	Rent	2021-10-23	expense	60000
13	13	Got my paycheck	2021-10-23	income	90000
14	13	What happens when I have a lot	2021-10-23	expense	3000
15	13	dont know im gonna keep adding	2021-10-23	expense	50000
16	13	Lottery	2021-10-23	income	1000000
17	13	new notebook	2021-10-23	expense	300000
18	13	im gonna get married	2021-10-23	expense	500000
19	14	Vendi meu gta5	2021-10-23	income	3000
20	14	New car	2021-10-25	expense	213400
21	13	Ice cream with sister	2021-10-25	expense	1500
\.


--
-- Data for Name: passwords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.passwords (id, "userId", password) FROM stdin;
1	\N	$2b$10$tVlW236mlGWcuwt4il0TdudOBWtYkloypGez6RDF4Sr6AT2WyBlG6
2	11	$2b$10$pkmQJWuSx5EdG9RKZ5KdSOfVsIEfCkfHEmLdjP3FaW.uYSE9kCKKe
3	12	$2b$10$jXW4YeINx1xeMUxShhnHQO/0E7d4L5ihd00CokpZbOe5OXc2rYj8e
4	13	$2b$10$EGxERhl.iEkruSYrupaw7urA7xhOI9bqKHHY10nA1myIFU/ASMCxe
5	14	$2b$10$9MtzI2mut/dUJHPGj56Y4e.77awOfhsf7NJyAOWHr5mNFjr/DcIL6
6	15	$2b$10$b791I75vPNsH4U/Ccpj5B.S.hSe0zer0oBP5ksLQrRKMFfS9ZbcM6
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, "userId", token) FROM stdin;
1	12	bd1e5907-fafd-461d-b8e2-7838dc9fe4d9
2	11	51995d55-b337-432d-9347-1a6181b831b3
3	13	c53b92cd-a6e2-4de6-a801-9abbd4c765b6
4	14	edcd4d1e-924f-4fac-9979-3c12dcd14898
5	15	1765c602-20c3-4081-8ca4-d5a19ba94f93
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email) FROM stdin;
1	Testonaldo	teste@example.com
2	Testonaldo	teste@example.com
3	Testonaldo	teste@example.com
4	Testinho	test@example.com
5	Testinho	testo@example.com
6	Testinho	testaaa@example.com
7	Testinho	testaaaaa@example.com
8	testooo	testeee@example.com
9	Testinho	tea@example.com
10	Testinho	teaaa@example.com
11	Testinho	teaaaa@example.com
12	Cavalo	cavalo@aexample.com
13	cachorro	cachorro@example.com
14	Rato	rato@example.com
15	Testonaldo	testonaldo@example.com
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 15, true);


--
-- Name: entries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entries_id_seq', 21, true);


--
-- Name: passwords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.passwords_id_seq', 6, true);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--

