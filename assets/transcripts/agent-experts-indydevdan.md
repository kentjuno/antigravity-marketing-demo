# Agent Experts: WHAT IF Your Google Antigravity Agents could LEARN?

**Video:** [YouTube](https://www.youtube.com/watch?v=zTcDwqopvKE)
**Channel:** IndyDevDan
**Duration:** 18:54
**Views:** 11,028 | **Likes:** 418 | **Comments:** 104

---

## Transcript

**[0:00]** Agents of today have many problems. Most of them can be solved with great context engineering and great agentic prompt engineering. But there is one massive problem that persists no matter how great your context engineering or agentic prompt engineering becomes.

**[0:16]** Traditional software improves as it's used, storing user analytics, usage data, and patterns that create algorithms. Agents of today don't. The massive problem with agents is this. Your agents forget. And that means your agents don't learn.

**[0:36]** There are a few solutions, but each has their own problems. Memory files are global forced context that always loads. As you know, expertise requires breaking rules when the time is right. Memory files also must be manually updated, consuming your time or your team's time.

**[0:59]** Then we have prime prompts, sub agents, and skills. Powerful agentic tools. But again, these all have to be manually updated when you want to add new information and steer your agents in a different direction.

**[1:13]** So what if you could take the best tool for the job of engineering agents to the next level by teaching your agents to act, learn, and reuse its expertise at runtime? What if you could create agent experts?

---

## What is an Agent Expert?

**[1:33]** The difference between a generic agent and an agent expert is simple. One executes and forgets, the other executes and learns.

**[1:44]** In this lesson, all execute, and you'll learn to build agents that turn actions into expertise, automatically storing the right information and reusing it with no human in the loop. This is key. This is what makes an expert an expert.

**[1:56]** You don't need to tell an expert to learn. It's in their DNA. Also, real experts don't relearn their craft every time they have a new task. True experts are always learning. They're updating their mental model.

**[2:11]** This mental model is simply put a data structure that evolves over time. With each useful action, experts accumulate information, examples, and ultimately expertise around a specific topic.

**[2:26]** This is key. You're not trying to solve every problem. You're trying to solve the one that matters the most to you, your business, and your customers.

**[2:35]** The expert understands that the game they're operating in never ends except for one condition. The moment they stop learning.

**[2:45]** I don't know about you, but I certainly want experts operating my codebase and products, not generic agents that forget that you have to boot up over and over and manage the memory files of manually.

---

## The Agent Expert Definition

**[2:59]** So, in the world of agent coding, prompt engineering, and context engineering, what is an agent expert exactly?

**[3:06]** The agent expert is a concrete form of a self-improving template metaprompt.

**[3:14]** That's a mouthful. Let's break this down because if you understand meta prompts, you will understand agent experts.

---

## Meta Agentics

**[3:22]** In this lesson, we'll walk through meta agentics or put plainly, no fancy language, meta prompts, meta sub agents, and meta skills.

**[3:30]** We're going to do this to showcase the atoms of what makes up the agent expert. We'll use our orchestrator agent from lesson 4 to showcase agent experts that operate specific areas of your small to large codebase extraordinarily well.

**[3:45]** This is one of the killer use cases of an expert. We'll then take a look at a product focus agent expert that let you build adaptive user experiences. A whole new untapped type of UI/UX waiting to be unlocked by engineers like you.

**[4:03]** Let's start with meta agentics. At their core, meta-agentics help you build elements of the system that builds the system.

**[4:09]** As mentioned, these include your meta prompts, your meta agents, and your meta skills. It's important we touch on these because they greatly increase your output as an agentic engineer with or without agent experts.

**[4:22]** Let's run through each to showcase their value proposition. In this agent experts codebase, you'll have access to in your loop box below.

### Meta Prompt Example

**[4:31]** We'll start with our meta prompt and we'll have it create a new version of a question prompt called question with mermaid diagrams. We'll fire that off.

### Meta Agent Example

**[4:40]** Let's fire off the meta agent, the agent that builds the agent. We're going to have it create a new planner agent that directly reads and executes the plan prompt. This way we can scale up planning to multiple agents in parallel.

### Meta Skill Example

**[4:53]** And finally, we'll use the meta skill to create a start orchestrator skill that's going to kick off the front end and the back end of our multi-agent orchestration application that we covered in lesson 4.

**[5:08]** We have prompts writing prompts, agents building agents, and skills building skills.

**[5:12]** There is no codebase I create that does not have meta agentics. Every codebase must have metagentics. Let this be your reminder to always use and have a stack of these ready to go to help you build out the next thing.

**[5:28]** They serve as the foundation to quickly spinning up new agentic layers which will be the topic of discussion in the final agentic horizon lesson.

---

## Results from Meta Agentics

**[5:37]** We have our question with mermaid diagrams built out here. You can see in our classic agentic prompt format. We have a great structure here and our variables just takes in the user question and then based on the purpose you can see exactly what's happening here.

**[5:50]** The key is if we search mermaid, you can see that we are always going to create mermaid diagrams that enhance understanding. We have a powerful question prompt that was built out by our meta prompt.

**[6:00]** We then had our meta agent build out a new planner agent. It takes in right it simply reads an existing prompt and it fires it as a sub agent. This is a powerful way to reuse and scale your existing prompts into their own agents.

**[6:15]** Lastly, we have our meta-skill. And our meta-skill took our existing process of kicking off the orchestrator front end and backend and we can now use it as a concrete skill.

**[6:24]** If we open up our start orchestrator skill, you can see exactly how it works. You can see the exact purpose. Start orchestrator 3 front end and backend. It has the flags. It has the details of where to go, how to start them. It's even going to open it up in Chrome for us after it's finished.

**[6:42]** And this was all built out thanks to our meta agentics, meta prompts, meta agents, meta skills.

---

## Are Meta-Agentics Agent Experts?

**[6:48]** Now, let's ask an important question. Are these meta-agentics agent experts?

**[6:53]** They're acting, but they're missing a key piece. They're not learning at all. Nothing inside of the metaprompt, the meta agent, or the meta-skill has updated automatically.

**[7:02]** Our meta tools are not becoming more proficient. Therefore, these are not agent experts.

**[7:07]** This is a key factor of what makes an agent expert. They must learn on their own.

**[7:17]** Agent experts must learn on their own.

**[7:21]** Now you teach them to learn by but after that they must accumulate and manage their own expertise.

---

## The Expertise File: A Mental Model

**[7:28]** Let's look at a concrete example a set of prompts that start to look more like an expert operating your codebase.

**[7:37]** So if we look at our do.claw directory and we go into our commands where our prompts are stored, we have this experts directory, we have a database expert. Let's click into this and understand the two prompts in this new expertise file.

**[7:52]** Let's open these up and before we deep dive into this, let's execute a question to our database agent. We'll type /quest and you can see our question prompts here. We'll tab on database question and then we'll ask this. How does information flow between our database tables, right? Your report in this temp file.

**[8:14]** So the first thing this agent does is critical and it changes the flow of everything. It first reads this expertise file.

**[8:22]** Now what is this? The expertise file is the mental model of the problem space for your agent expert.

**[8:29]** You can see it first read the expertise file and then it started comparing its understanding against the actual code and it did it instantly. It didn't need to go search or find these files. It knew where they were.

**[8:44]** This is the differentiated factor of an agent expert. It contains a working mental model just like you or I or any engineer on your team would.

---

## Not Another Source of Truth

**[8:56]** This is big. Okay. what we've developed here inside this YAML file. It's super important to just touch on this idea right away.

**[9:02]** You know, a lot of legit engineers might be thinking this, isn't that another source of truth? Don't we now have the code, the comments, you know, the PRDs, the plans, product documentation, and this expertise file.

**[9:14]** This is not what that is. Let me be ultra clear about this. This is not a source of truth.

**[9:18]** The mental model you have of your code bases, you don't have a source of truth in your mind. You have a working memory file. You have a mental model.

**[9:29]** We can see that it has created a comprehensive flow of our database. Let's open this up. Let's go into our preview view here for this markdown file. Database information flow reports.

**[9:37]** To be super clear, we are pointing our agent toward the multi-agent orchestration application. This could be anything.

**[9:44]** All right. System uses six Postgres database tables to track orchestrator agent command their communications and logging. We have a parent child pattern that cascades deletes.

**[9:55]** All right. So we have an entity relationship diagram there. Great breakdown. You can see all the tables how they relate. We have information flow patterns. We have three-way communication between the user right you or I the orchestrator and they respond back to the user but also they can talk and communicate to the agent and then the agent responds to the orchestrator.

**[10:18]** This isn't about the multi-agent orchestration system. We're just pointing our agents at this domain.

**[10:24]** All right. So there's a ton of details here. The key here is this. We had an agent very quickly use its mental model. It validated its mental model against the source of truth.

**[10:30]** The true source of truth is always the code. You and I know that. Not the comments, not the documentation, not the plans. It is the code. The code is what runs and builds the product.

**[10:40]** But that does not mean that auxiliary documents and memory and mental models, right, expertise, it does not mean that they're not all too valuable. And you're going to see that over and over again here.

---

## The Question Prompt Structure

**[10:51]** What does this look like? What is in this expertise file? And before we get there, you know, just to at a very high level break down the question prompt, you take in an argument and our question prompt also has a static variable that references of course the expertise file.

**[11:05]** And the first thing it does is it reads this. All right, and the workflow it reads this right away and then it validates its assumptions against the codebase.

**[11:14]** All right, super critical line. I have it in here twice for that reason.

**[11:18]** All right. Only then does it actually report. So that's a question prompt.

---

## The Self-Improve Prompt

**[11:22]** Now, what is the expertise and how do we build it? Let's just run this self-improve database. We have a couple additional flags here. We don't need any of them. Let's kick it off.

**[11:32]** All right. Let's let our agent sync its mental model with the working codebase. And so you can see what's coming here, right? What is the self-improve prompt? It is in fact.

---

## WebSocket Expert Demo

**[11:45]** So before we take a look at our websocket expert at all, let's kick it off. I'm going to use that three-step agentic workflow here /pl.

**[11:53]** And we're going to do this. Add a session-based counter to the app navbar that displays the total number of websocket events. Right? Perfect for a websocket expert. It knows where all this stuff is. There's no searching here. There's just validating its mental model.

**[12:07]** So, we're just going to go ahead kick this off right away. And to be super clear, we are having our agent add to this, right? So, we have active, running, logs, cost. It's going to add a web socket counter here.

**[12:19]** Just a simple example showcasing how you can have an agent expert that knows that code the best better than anyone quickly update something.

---

## Scaling with Multiple Agents

**[12:27]** Before we dive into this, let's just fire off some more prompts, right? Let's have some fun with our multi-agent orchestration tool here.

**[12:34]** And you can see here that we also have our expert and we have our websocket expert specifically. And I just want to run this question prompt here. Okay. So, I'm just going to click this here. I want to ask what websocket events exist in our system.

**[12:46]** I'm just going to fire this off and actually uh let's scale this up. So I'm going to say create three agents and run this. This is an agent orchestration system. We can easily quickly scale up more agents against a specific problem.

**[13:03]** And this is a really cool way to co-locate on the right answer. Instead of having one agent answer something for you, have three, have five, have 10, right? Depending on how important it is that the answer is correct.

**[13:11]** So there we go. Our orchestrator agent is going to kick this off. It's designed a specialized system prompt and it's going to do this work on our behalf.

**[13:19]** Okay, we covered the agent orchestration in lesson 4. This is not about the agent orchestration system. We're just going to use this to showcase how powerful agent experts can be.

**[13:29]** We have now deployed three websocket agent experts to answer one question. when they come back with their answer, we're going to be a lot more confident that they're giving us the right answer.

---

## Three-Step Workflow: Plan, Build, Self-Improve

**[14:15]** So before we take a look at our websocket expert at all, let's go ahead and collapse this. Right? We have a three-step workflow where each of them is going to kick off a different sub agent.

**[14:23]** We're going to create our plan. So, a classic planning step. We're then going to build against the plan. You've seen this before, right? This is classic prompt chaining via an agentic workflow.

**[14:30]** We're putting together prompts so that our agents do more and then we're scaling it out. We are using sub agents here to get this work done.

**[14:40]** You can see we are creating our websocket plan to get this work done. All right, so we have that build step and then we have our self improve step.

**[14:47]** Okay, so all of a sudden things get really interesting here. We're not just planning and building the codebase updates, source of truth updates, but no one's keeping track.

**[14:51]** No one actually knows what's changed. You, the engineer, have to jump in, understand what happened, validate what happened, keep track of the changes somewhere, create some review documentation.

**[15:03]** The agent expertise is ultra powerful because it lets our agent keep track of this.

**[15:08]** What we're doing here is we're really hitting on that key tactic from lesson six. At step three, we are going to run guess what? The self-improve prompt.

**[15:17]** If we click into this for a websocket expert, you can see a very similar structure. It's almost as if I had an expert metaprompt generate this for me.

**[15:28]** Okay, hat tip. Nudge, nudge, wink, wink. Once you start building something repeatedly in your system, you want to move that into automation, right? Three times marks a pattern. I in fact do have a meta expert.

---

## Results and Validation

**[15:44]** We should see a counter pop up here at some point, but right now we did have our three websocket agents complete. You can see the application starting to live update. That's cool.

**[15:51]** Um, I can open this up and ask based on and I'm just going to click click click what websocket events be concise bullet points.

**[16:01]** Okay, so all of our agents have completed. You can see all the consumed files from that agent and so we can concretely see this. Our orchestrator can synthesize all the results.

**[16:11]** And very interesting here. Let's check this out, right? Websocket 3 didn't complete the task. And so this is another key value proposition to scale up your compute.

**[16:18]** Sometimes if you throw five agents at the problem, only one makes it. One finds something the other didn't, the other finds some things the others didn't, and then you compose that together, you get a better result.

**[16:30]** Okay, so this is correct. Um, you know, my mental model can validate this. We in fact do have 21 types across I don't know if there are seven categories, but there are some 20 websocket events.

**[16:37]** So agent life cycle, agent communication, orchestrator, chat, system, blah blah blah blah blah.

**[16:43]** Okay, we had our agent experts build this out, validate this work, and you can see the UI flickering here because our build websocket agent is updating the store and soon it's going to update the actual front end based on the plan.

---

## Context Protection and Scaling

**[16:57]** We've talked about this in previous agenda horizon lessons, but we are reducing and delegating our context. The plan step here took 80k tokens.

**[17:05]** Our top level agent here has its context completely protected. All it did was pass the return plan into the builder. And once the builder finishes, it's going to pass the get diff work right into our self-improve.

**[17:17]** Three agent experts completed the work. And if we want to, you know, we could have even scaled this up further. And we can say something like this, right? Create three more experts. Same prompt to ultra validate.

**[17:32]** Okay, so we can do all types of things once we get these powerful orchestration systems and powerful expert systems up and running.

**[17:41]** Websocket built done. Check this out. 61k tokens, 41 tool uses. And we should be able to see this here. I'm going to go ahead and refresh. There we go. Websocket event one. There's another one coming in there.

**[17:50]** All right. And so you can see here our Opus Orchestrator agents are fired off here.

---

## Self-Improving in Action

**[17:57]** And in our last step here, you can see our self-improve websocket expert is kicking off. It is making updates, right? Things have changed in the system.

**[18:05]** We're entering this really weird phase where you can truly create high performance agents and all you need is the right information, the right prompts and then you can compose them into whatever you want to.

**[18:17]** All right, you know many engineers you might be thinking just build a skill that can be a skill that could be an agent that can be a sub agent whatever I it doesn't matter. Okay, build whatever you want.

---

## Key Takeaways

1. **The Problem**: Agents forget - they execute but don't learn
2. **The Solution**: Agent Experts - agents that execute AND learn automatically
3. **Mental Models**: Expertise files serve as evolving data structures, not sources of truth
4. **Meta Agentics**: Meta prompts, meta agents, and meta skills build the system that builds the system
5. **Three-Step Workflow**: Plan -> Build -> Self-Improve
6. **Scale Compute**: Deploy multiple experts against critical questions for higher confidence
7. **Context Protection**: Delegate work to sub-agents to protect top-level context
8. **Code is Truth**: The code is always the source of truth, but expertise files are valuable mental models

---

*Transcript from IndyDevDan's "Agent Experts: WHAT IF Your Google Antigravity Agents could LEARN?" - Agentic Horizon Lesson 5*
