import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Rocket, BadgeCheckIcon } from "lucide-react";

const About = () => {
    return (
        <div className='w-11/12 mx-auto px-4'>
            <div className="w-full bg-background text-foreground">
                <section className="w-11/12 mx-auto py-16 text-center">
                    <motion.h1
                        className="text-4xl sm:text-5xl font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        About <span className="text-primary">WorkSphere</span>
                    </motion.h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        WorkSphere is a modern workplace management platform that empowers
                        teams, HR, and employees to collaborate, grow, and achieve their goals
                        with transparency and efficiency.
                    </p>
                </section>

                <section className="w-11/12 mx-auto grid sm:grid-cols-2 gap-6 py-12">
                    <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
                        <CardContent className="p-6 text-center">
                            <Target className="mx-auto mb-4 text-primary" size={40} />
                            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                            <p className="text-muted-foreground">
                                To simplify workplace operations by offering a unified platform
                                for employee management, payroll, collaboration, and performance
                                tracking.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
                        <CardContent className="p-6 text-center">
                            <Lightbulb className="mx-auto mb-4 text-primary" size={40} />
                            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
                            <p className="text-muted-foreground">
                                To become the most trusted and innovative digital workspace,
                                enabling companies and employees to work smarter, not harder.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="w-11/12 mx-auto py-12">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <Card className="p-6 text-center shadow-md hover:shadow-lg transition rounded-2xl">
                            <Users className="mx-auto mb-3 text-primary" size={36} />
                            <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
                            <p className="text-muted-foreground">
                                We believe in teamwork, open communication, and shared success.
                            </p>
                        </Card>
                        <Card className="p-6 text-center shadow-md hover:shadow-lg transition rounded-2xl">
                            <Rocket className="mx-auto mb-3 text-primary" size={36} />
                            <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                            <p className="text-muted-foreground">
                                Constantly evolving with cutting-edge technology to solve
                                real-world challenges.
                            </p>
                        </Card>
                        <Card className="p-6 text-center shadow-md hover:shadow-lg transition rounded-2xl">
                            <BadgeCheckIcon className="mx-auto mb-3 text-primary" size={36} />
                            <h3 className="font-semibold text-lg mb-2">Integrity</h3>
                            <p className="text-muted-foreground">
                                We are committed to transparency, trust, and accountability.
                            </p>
                        </Card>
                    </div>
                </section>

                <section className="w-11/12 mx-auto text-center py-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Ready to Transform Your Workplace?
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Join WorkSphere today and experience a smarter, more connected way to
                        manage work and people.
                    </p>
                    <Button size="lg" variant="default">
                        Get Started
                    </Button>
                </section>
            </div>
        </div>
    )
}

export default About